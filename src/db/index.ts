import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { advocateData } from "./seed/advocates";
import type { InferSelectModel } from "drizzle-orm";
import type { advocates } from "./schema";

type Advocate = InferSelectModel<typeof advocates>;

const setup = () => {
  if (!process.env.DATABASE_URL) {
    /**
     * Mock Database Implementation
     *
     * This mock allows the application to run without a real database connection,
     * useful for development, testing, and demos. It returns static seed data
     * from ./seed/advocates.ts.
     *
     * The mock implements only the Drizzle methods used in this application:
     * - select().from() for basic queries
     * - insert().values() for seeding (returns empty array)
     *
     * This approach enables:
     * - Quick setup without database configuration
     * - Consistent demo data for presentations
     * - Development without external dependencies
     * - Fallback when database is unavailable
     *
     * To use a real database, set DATABASE_URL in your .env file.
     */
    const mockDb = {
      select() {
        return {
          from: () => {
            // Return the seed data for advocates
            return Promise.resolve(
              advocateData.map((advocate, index) => ({
                ...advocate,
                id: index + 1,
                specialties: advocate.specialties as string[],
                createdAt: new Date(),
              }))
            ) as Promise<Advocate[]>;
          },
          where: () => ({
            limit: () => ({
              offset: () => Promise.resolve([]) as Promise<Advocate[]>,
            }),
          }),
        };
      },
      insert: () => ({
        values: () => ({
          returning: () => Promise.resolve([]),
        }),
      }),
    };
    return mockDb as any;
  }

  // for query purposes
  const queryClient = postgres(process.env.DATABASE_URL);
  const db = drizzle(queryClient);
  return db;
};

export default setup();
