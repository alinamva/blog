"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { deletePost } from "@/lib/actions";

const Post = ({
  title,
  id,
  image,
  author,
}: {
  title: string;
  id: number;
  image: string;
  author: string;
}) => {
  const handleDelete = async (postId: number) => {
    try {
      await deletePost(postId);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleDelete(id);
  };
  return (
    <div key={id} className="rounded-xl border-munssel  border">
      {image && (
        <Image
          src={image}
          alt=""
          width={350}
          height={300}
          className="rounded-t-xl"
        />
      )}
      <div className="p-4 text-munssel">
        <h2>{title}</h2>
        <span>{author}</span>

        <form onSubmit={handleSubmit}>
          <Button type="button">Delete post</Button>
        </form>
        <Link href={`/posts/${id}`}>
          <span>See more</span>
        </Link>
      </div>
    </div>
  );
};

export default Post;
