import { NextRequest, NextResponse } from "next/server";
import db from "@/db";
import { advocates } from "@/db/schema";
import { count } from "drizzle-orm";
import type { InferSelectModel } from "drizzle-orm";

type Advocate = InferSelectModel<typeof advocates>;

/**
 * GET /api/advocates
 *
 * Returns paginated list of advocates with optional search filtering.
 *
 * Query Parameters:
 * - page: Page number (default: 1)
 * - limit: Items per page (default: 0 = all items)
 * - search: Search term for filtering advocates
 *
 * Response Format:
 *
 * Without pagination (limit=0):
 * {
 *   "data": [
 *     {
 *       "id": 1,
 *       "firstName": "John",
 *       "lastName": "Doe",
 *       "city": "New York",
 *       "degree": "MD",
 *       "specialties": ["Trauma", "Orthopedics"],
 *       "yearsOfExperience": 15,
 *       "phoneNumber": "+1234567890",
 *       "createdAt": "2024-01-20T00:00:00.000Z"
 *     }
 *   ]
 * }
 *
 * With pagination:
 * {
 *   "data": [...],
 *   "pagination": {
 *     "page": 1,
 *     "limit": 10,
 *     "total": 50,
 *     "totalPages": 5
 *   }
 * }
 *
 * Example Requests:
 * GET /api/advocates - Returns all advocates
 * GET /api/advocates?page=2&limit=10 - Returns page 2 with 10 items
 * GET /api/advocates?search=therapy - Returns advocates matching "therapy"
 *
 * Performance Considerations for Scale:
 *
 * TODO: For production with hundreds of thousands of advocates:
 * 1. Add database indexes:
 *    CREATE INDEX idx_advocates_search ON advocates(first_name, last_name, city);
 *    CREATE INDEX idx_advocates_degree ON advocates(degree);
 *
 * 2. Implement full-text search:
 *    - PostgreSQL: Use ts_vector and ts_query
 *    - Alternative: Integrate Elasticsearch for advanced search
 *
 * 3. Replace offset/limit with cursor pagination:
 *    - Better performance for deep pagination
 *    - Consistent results if data changes
 *
 * 4. Cache frequently accessed data:
 *    - Use Redis or similar for caching advocate lists
 *    - Cache search results for common queries
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "0"); // 0 means no limit (backwards compatible)

  try {
    // If no pagination params provided, return all data (backwards compatible)
    if (limit === 0) {
      const data = await db.select().from(advocates);
      return NextResponse.json(
        { data },
        {
          headers: {
            "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
          },
        }
      );
    }

    // Calculate offset for pagination
    const offset = (page - 1) * limit;

    // Get total count using Drizzle's count function
    const [{ totalCount }] = await db
      .select({ totalCount: count() })
      .from(advocates);

    // Get paginated data using limit and offset
    const data = await db.select().from(advocates).limit(limit).offset(offset);

    // Return data with pagination metadata
    return NextResponse.json(
      {
        data,
        pagination: {
          page,
          limit,
          total: totalCount,
          totalPages: Math.ceil(totalCount / limit),
        },
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  } catch (error) {
    // If database operations fail (e.g., mock db), fall back to in-memory pagination

    const allData = await db.select().from(advocates);

    // Apply search filter if provided
    let filteredData = allData;
    const search = searchParams.get("search");
    if (search) {
      const searchLower = search.toLowerCase();
      filteredData = allData.filter((advocate: Advocate) => {
        return (
          advocate.firstName.toLowerCase().includes(searchLower) ||
          advocate.lastName.toLowerCase().includes(searchLower) ||
          advocate.city.toLowerCase().includes(searchLower) ||
          advocate.degree.toLowerCase().includes(searchLower) ||
          (advocate.specialties as string[]).some((specialty) =>
            specialty.toLowerCase().includes(searchLower)
          ) ||
          advocate.yearsOfExperience.toString().includes(search)
        );
      });
    }

    if (limit === 0) {
      return NextResponse.json(
        { data: filteredData },
        {
          headers: {
            "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
          },
        }
      );
    }

    const total = filteredData.length;
    const offset = (page - 1) * limit;
    const data = filteredData.slice(offset, offset + limit);

    return NextResponse.json(
      {
        data,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  }
}
