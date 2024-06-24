"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { createlikes, deletePost } from "@/lib/actions";
import {
  EllipsisVertical,
  Import,
  MessageCircle,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { postsTable } from "@/lib/db/schema";

type PostProps = typeof postsTable.$inferSelect & {
  hasLiked?: number;
  likesCount?: number;
};

const Post = ({
  title,
  id,
  image,
  author,
  hasLiked,
  likesCount,
}: PostProps) => {
  const handleDelete = async (postId: number) => {
    try {
      alert("Are you sure?");
      await deletePost(postId);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  const [active, setActive] = useState("default");

  const toggleActive = () => {
    setActive((prevColor) =>
      prevColor === "default" ? "destructive" : "default"
    );
  };

  const handleLike = async (postId: number) => {
    await createlikes(postId);
  };

  return (
    <div
      key={id}
      className=" relative  cursor-pointer  border-b-gray-300 border-b p-2"
    >
      <div className="absolute right-0 py-4 px-2 ">
        <Popover>
          <PopoverTrigger>
            <EllipsisVertical color="white" />
          </PopoverTrigger>
          <PopoverContent>
            <ul>
              <li
                className="p-4 cursor-pointer hover:bg-midnightGreen hover:text-munssel  duration-150"
                onClick={() => handleDelete(id)}
              >
                Delete post
              </li>
              <Link href={`/editpost/${id}`}>
                <li className="p-4 cursor-pointer  duration-150 ">Edit</li>
              </Link>
            </ul>
          </PopoverContent>
        </Popover>
      </div>
      <h2>{title}</h2>
      {image?.includes("/") && image && (
        <Image
          src={image}
          alt=""
          width={550}
          height={300}
        />
      )}
      <div className="p-4  flex  flex-col gap-3">
        <span>{author}</span>
        <Link href={`/posts/${id}`}>
          <span className="transform transition-transform duration-300  ">{`See more -->`}</span>
        </Link>
      </div>

      {likesCount}
      <div className="flex justify-around rounded-xl bg-gray-100 p-2 ">
        <Button
          type="submit"
          onClick={() => handleLike(id)}
        >
          {hasLiked ? (
            <>
              <ThumbsDown />
              Unlike
            </>
          ) : (
            <>
              <ThumbsUp />
              Like
            </>
          )}
        </Button>
        <div className="bg-gray-300 w-[1px] h-6 "></div>
        <MessageCircle />
        <div className="bg-gray-300 w-[1px] h-6"></div>
        <Import />
      </div>
    </div>
  );
};

export default Post;
