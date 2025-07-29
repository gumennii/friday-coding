import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { advocateData } from "./seed/advocates";
import type { InferSelectModel } from "drizzle-orm";
import type { advocates } from "./schema";

type Advocate = InferSelectModel<typeof advocates>;

const setup = () => {
  if (!process.env.DATABASE_URL) {
    // Return a mock that only handles the methods we actually use
    const mockDb = {
      select() {
        return {
          from: () => {
            // Return the seed data for advocates
            return Promise.resolve(advocateData.map((advocate, index) => ({
              ...advocate,
              id: index + 1,
              specialties: advocate.specialties as string[],
              createdAt: new Date()
            }))) as Promise<Advocate[]>;
          },
          where: () => ({
            limit: () => ({
              offset: () => Promise.resolve([]) as Promise<Advocate[]>
            })
          })
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
