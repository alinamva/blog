"use server";

import {
  likesTable,
  postsTable,
  sessionTable,
  usersTable,
} from "@/lib/db/schema";
import { redirect } from "next/navigation";
import { and, count, eq, getTableColumns } from "drizzle-orm";
import { cookies } from "next/headers";
import { lucia, validateRequest } from "@/lib/auth";
import { generateIdFromEntropySize } from "lucia";
import db from "../db/migrate";
import { hash } from "@node-rs/argon2";
import { alias } from "drizzle-orm/pg-core";
import { revalidatePath } from "next/cache";

export const getPosts = async () => {
  const { user } = await validateRequest();
  const posts = await db.select().from(postsTable);

  if (!user) {
    return posts;
  }

  // const like = db
  //   .select({ value: count(likesTable.postId) })
  //   .from(likesTable)
  //   .where(
  //     and(eq(likesTable.postId, post.id), eq(likesTable.userId, user?.id))
  //   )
  //   .groupBy(likesTable.postId);

  const columns = getTableColumns(postsTable);

  const hasLiked = alias(likesTable, "hasLiked");

  const likes = await db
    .select({
      ...columns,
      likesCount: count(likesTable.postId).as("likesCount"),
      hasLiked: count(hasLiked.userId),
    })
    .from(postsTable)
    .leftJoin(likesTable, eq(likesTable.postId, postsTable.id))
    .leftJoin(
      hasLiked,
      and(eq(hasLiked.postId, postsTable.id), eq(hasLiked.userId, user.id))
    )
    .groupBy(postsTable.id);

  //     .leftJoin(
  //   likesTable,
  //   and(eq(likesTable.postId, postsTable.id), eq(likesTable.userId, user.id))
  // );

  // console.log(likes);

  return likes;
};

export const createPost = async (imageUrl: string[], data: FormData) => {
  const { user, session } = await validateRequest();
  console.log(imageUrl);
  if (!user || !session?.userId) {
    return "Please log in to create a post.";
  }
  if (user && session?.userId) {
    const description = data.get("description") as string;
    const image = imageUrl;
    const author = await db
      .select({ username: usersTable.username })
      .from(usersTable)
      .where(eq(usersTable.id, session.userId))
      .then((res) => res[0]);
    const authorId = session.userId;

    const newPost = {
      description: description[0].toLocaleUpperCase() + description.slice(1),
      author: author.username,
      image,
      authorId,
    };
    await db.insert(postsTable).values(newPost);
    // console.log(newPost);
    redirect("/");
  }
};

export const deleteAllPosts = async () => {
  await db.delete(postsTable);
};

export const deletePost = async (id: number) => {
  await db.delete(postsTable).where(eq(postsTable.id, id));
};
// export const updatePost = async (id: number) => {
//   await db.update(postsTable).set({ title: "a" }).where(eq(postsTable.id, id));
// };

export const signup = async (data: FormData) => {
  const userId = generateIdFromEntropySize(10);
  const username = data.get("username") as string;
  const password = data.get("password_hash") as string;

  const existingUser = (
    await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.username, username.toLowerCase()))
  ).at(0);

  if (existingUser) {
    return "User exists";
  }

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
  const password = formData.get("password");

  const existingUser = (
    await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.username, username.toLowerCase()))
  ).at(0);

  if (!existingUser) {
    return "User doesn't exists";
  }

  const existingSessions = await getSessionsByUserId(existingUser.id);
  for (const session of existingSessions) {
    await lucia.invalidateSession(session.id);
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(sessionCookie.name, sessionCookie.value, {
    ...sessionCookie.attributes,
    path: "/",
    httpOnly: true,
  });
  const sessionId = session.id;

  redirect("/");
};

export const logout = async () => {
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

export const createlikes = async (id: number) => {
  const { user } = await validateRequest();
  if (!user) {
    redirect("/login");
  }
  if (user) {
    const userId = user.id as string;
    const postId = id;
    const newLike = {
      userId,
      postId,
    };

    const existsPost = (
      await db
        .select()
        .from(likesTable)
        .where(
          and(eq(likesTable.postId, postId), eq(likesTable.userId, userId))
        )
    ).at(0);

    if (existsPost) {
      console.log("hmm", existsPost);
      return unlikePost(id);
    }

    await db.insert(likesTable).values(newLike);
    revalidatePath("/");
  }
};

export const unlikePost = async (id: number) => {
  const { user } = await validateRequest();
  if (user) {
    const userId = user.id as string;
    const postId = id;
    await db
      .delete(likesTable)
      .where(and(eq(likesTable.postId, postId), eq(likesTable.userId, userId)));

    revalidatePath("/");
  }
};
