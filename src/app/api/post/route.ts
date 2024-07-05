import db from "@/lib/db/migrate";
import { Post, postsTable } from "@/lib/db/schema";
import { v2 as cloudinary } from "cloudinary";
export async function GET() {
  const post: Post[] = await db.select().from(postsTable);
  return Response.json(post);
}
export async function POST(request: Request) {
  const body = (await request.json()) as {
    paramsToSign: Record<string, string>;
  };
  const { paramsToSign } = body;

  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET as string
  );

  return Response.json({ signature });
}
