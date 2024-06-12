"use server";

import { postsTable, sessionTable, usersTable } from "@/lib/db/schema";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { lucia, validateRequest } from "@/lib/auth";
import { generateIdFromEntropySize } from "lucia";
import db from "../db/migrate";
import { hash, verify } from "@node-rs/argon2";
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
  const password = data.get("password_hash") as string;
  const password_hash = await hash(password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });
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
  redirect("/login");
};
export const getSessionsByUserId = async (userId: string) => {
  return await db
    .select()
    .from(sessionTable)
    .where(eq(sessionTable.userId, userId));
};
export const login = async (formData: FormData) => {
  const username = formData.get("username") as string;
  // if (
  //   typeof username !== "string" ||
  //   username.length < 3 ||
  //   username.length > 31 ||
  //   !/^[a-z0-9_-]+$/.test(username)
  // ) {
  //   return {
  //     error: "Invalid username",
  //   };
  // }
  const password = formData.get("password");
  // if (
  //   typeof password !== "string" ||
  //   password.length < 6 ||
  //   password.length > 255
  // ) {
  //   return {
  //     error: "Invalid password",
  //   };
  // }

  const existingUser = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.username, username.toLowerCase()))
    .then((rows) => rows[0]);

  if (!existingUser) {
    return "User doesn't exists";
  }

  // const validPassword = await verify(existingUser.password_hash, password, {
  //   memoryCost: 19456,
  //   timeCost: 2,
  //   outputLen: 32,
  //   parallelism: 1,
  // });
  // if (!validPassword) {
  //   return {
  //     error: "Incorrect username or password",
  //   };
  // }
  const existingSessions = await getSessionsByUserId(existingUser.id);
  for (const session of existingSessions) {
    await lucia.invalidateSession(session.id);
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return redirect("/");
};

export const logout = async () => {
  "use server";
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/login");
};
