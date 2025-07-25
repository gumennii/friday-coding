import db from "@/db";
import { advocates } from "@/db/schema";
import { advocateData } from "@/db/seed/advocates";

export async function GET() {
  // Use database instead of hardcoded data
  const data = await db.select().from(advocates);

  // const data = advocateData;

  return Response.json({ data });
}
