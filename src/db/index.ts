import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { advocateData } from "./seed/advocates";
import type { InferSelectModel } from "drizzle-orm";
import type { advocates } from "./schema";

type Advocate = InferSelectModel<typeof advocates>;

interface MockDb {
  select: (columns?: Record<string, unknown>) => {
    from: () => Promise<Advocate[]>;
  };
  insert: () => {
    values: () => {
      returning: () => Promise<Advocate[]>;
    };
  };
}

const setup = () => {
  if (!process.env.DATABASE_URL) {
    // Return a mock that matches Drizzle's API more closely
    const mockDb: MockDb = {
      select: (columns) => ({
        from: () => {
          // If selecting count, throw to trigger fallback
          if (columns && (columns.totalCount || columns.count)) {
            throw new Error("Mock DB: count not supported");
          }
          // Return the seed data for advocates
          return Promise.resolve(advocateData.map((advocate, index) => ({
            ...advocate,
            id: index + 1,
            specialties: advocate.specialties as string[],
            createdAt: new Date()
          })));
        },
      }),
      insert: () => ({
        values: () => ({
          returning: () => Promise.resolve([]),
        }),
      }),
    };
    return mockDb as ReturnType<typeof drizzle>;
  }

  // for query purposes
  const queryClient = postgres(process.env.DATABASE_URL);
  const db = drizzle(queryClient);
  return db;
};

export default setup();
