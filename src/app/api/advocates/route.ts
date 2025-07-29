import { NextRequest } from "next/server";
import db from "@/db";
import { advocates } from "@/db/schema";
import { count } from "drizzle-orm";
import type { InferSelectModel } from "drizzle-orm";

type Advocate = InferSelectModel<typeof advocates>;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "0"); // 0 means no limit (backwards compatible)

  try {
    // If no pagination params provided, return all data (backwards compatible)
    if (limit === 0) {
      const data = await db.select().from(advocates);
      return Response.json({ data });
    }

    // Calculate offset for pagination
    const offset = (page - 1) * limit;

    // Get total count using Drizzle's count function
    const [{ totalCount }] = await db
      .select({ totalCount: count() })
      .from(advocates);

    // Get paginated data using limit and offset
    const data = await db
      .select()
      .from(advocates)
      .limit(limit)
      .offset(offset);

    // Return data with pagination metadata
    return Response.json({
      data,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
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
      return Response.json({ data: filteredData });
    }

    const total = filteredData.length;
    const offset = (page - 1) * limit;
    const data = filteredData.slice(offset, offset + limit);

    return Response.json({
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  }
}
