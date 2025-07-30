import db from "@/db";
import { advocates } from "@/db/schema";
import { count, ilike, or } from "drizzle-orm";
import type { InferSelectModel } from "drizzle-orm";

type Advocate = InferSelectModel<typeof advocates>;

interface GetAdvocatesParams {
  search?: string;
  page: number;
  pageSize: number;
}

/**
 * Fetches advocates with search and pagination support.
 *
 * This function attempts to use the database first, but falls back to
 * in-memory filtering if the database is unavailable (e.g., mock database).
 * This allows the app to work both with and without a real database connection.
 *
 * @param search - Optional search term to filter advocates
 * @param page - Page number for pagination (1-based)
 * @param pageSize - Number of items per page
 * @returns Object containing advocates array and total count
 */
export async function getAdvocates({
  search,
  page,
  pageSize,
}: GetAdvocatesParams) {
  const offset = (page - 1) * pageSize;

  try {
    // Build query
    let query = db.select().from(advocates);
    let countQuery = db.select({ count: count() }).from(advocates);

    // Add search filter if provided
    if (search) {
      const searchCondition = or(
        ilike(advocates.firstName, `%${search}%`),
        ilike(advocates.lastName, `%${search}%`),
        ilike(advocates.city, `%${search}%`),
        ilike(advocates.degree, `%${search}%`)
      );
      query = query.where(searchCondition);
      countQuery = countQuery.where(searchCondition);
    }

    // Execute queries
    const [{ count: totalCount }] = await countQuery;
    const advocatesData = await query.limit(pageSize).offset(offset);

    return {
      advocates: advocatesData,
      totalCount,
    };
  } catch (error) {
    // Fallback for mock database
    const allData = await db.select().from(advocates);

    // Apply search filter if provided
    let filteredData = allData;
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

    // Apply pagination
    const paginatedData = filteredData.slice(offset, offset + pageSize);

    return {
      advocates: paginatedData,
      totalCount: filteredData.length,
    };
  }
}
