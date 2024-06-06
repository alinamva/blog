"use server";

import db from "@/lib/db/migrate";
import { postsTable } from "@/lib/db/schema";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

export const createPost = async (data: FormData) => {
  const title = data.get("title") as string;
  const description = data.get("description") as string;
  const author = data.get("author") as string;
  const image = data.get("image") as string;
  const newPost = {
    title: title[0].toUpperCase() + title.slice(1),
    description: description[0].toLocaleUpperCase() + description.slice(1),
    author: author[0].toLocaleUpperCase() + author.slice(1),
    image,
  };
  await db.insert(postsTable).values(newPost);
  console.log(newPost);
  redirect("/");
};

export const deleteAllPosts = async () => {
  await db.delete(postsTable);
};

export const deletePost = async (id: number) => {
  await db.delete(postsTable).where(eq(postsTable.id, id));
};
