import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { advocateData } from "./seed/advocates";

const setup = () => {
  if (!process.env.DATABASE_URL) {
    // Return a mock that matches Drizzle's API more closely
    const mockDb = {
      select: (columns?: any) => ({
        from: () => {
          // If selecting count, throw to trigger fallback
          if (columns && columns.totalCount || columns && columns.count) {
            throw new Error("Mock DB: count not supported");
          }
          // Return the seed data for advocates
          return Promise.resolve(advocateData.map((advocate, index) => ({
            ...advocate,
            id: index + 1,
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
    return mockDb as any;
  }

  // for query purposes
  const queryClient = postgres(process.env.DATABASE_URL);
  const db = drizzle(queryClient);
  return db;
};

export default setup();
