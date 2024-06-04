import db from "@/lib/db/migrate";
import { Post, postsTable } from "@/lib/db/schema";

export async function GET() {
  const post: Post[] = await db.select().from(postsTable);
  return Response.json(post);
}
