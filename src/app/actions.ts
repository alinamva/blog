"use server";

import db from "@/lib/db/migrate";
import { Post as PostType, postsTable } from "@/lib/db/schema";

const createPost = async () => {
  const posts: PostType[] = await db.select().from(postsTable);
  //   const { title, description } = Object.fromEntries(posts);
  const newPost = { title: "a", description: "b" };
  console.log(newPost);
};
export default createPost;
