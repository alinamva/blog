import db from "@/lib/db/migrate";
import { postsTable } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";
import Image from "next/image";
import React from "react";

const Post = async ({ params }: { params: { slug: number } }) => {
  const post = await db
    .select()
    .from(postsTable)
    .where(eq(postsTable.id, params.slug))
    .then((rows) => rows[0]);

  console.log(post);
  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <h2>{post.title}</h2>
      {post.image && (
        <Image
          src={post.image}
          alt="post"
          width={500}
          height={500}
        />
      )}
      <p>{post.description}</p>
      <span>{post.author}</span>
    </div>
  );
};

export default Post;
