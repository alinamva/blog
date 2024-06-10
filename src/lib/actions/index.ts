"use server";

import { postsTable, usersTable } from "@/lib/db/schema";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { lucia } from "@/lib/auth";
import { generateIdFromEntropySize } from "lucia";
import db from "../db/migrate";

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
export const updatePost = async () => {
  await db.update(postsTable).set({ title: "a" }).where(eq(postsTable.id, id));
};

export const signup = async (data: FormData) => {
  const userId = generateIdFromEntropySize(10);
  const username = data.get("username") as string;
  const password_hash = data.get("password_hash") as string;
  // const password_hash = await hash(password);
  const newUser = {
    id: userId,
    username: username,
    password_hash: password_hash,
  };

  await db.insert(usersTable).values(newUser);
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
};
