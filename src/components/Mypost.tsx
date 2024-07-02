"use client";
import Image from "next/image";
import Link from "next/link";
// import React, { useState } from "react";
import { createlikes, deletePost } from "@/lib/actions";
import {
  EllipsisVertical,
  Heart,
  Import,
  MessageCircle,
  User,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { postsTable } from "@/lib/db/schema";
interface Post {
  id: number;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  author: string | null;
  authorId: string | null;
  image: string | null;
}
type PostProps = typeof postsTable.$inferSelect & {
  hasLiked?: number;
  likesCount?: number;
  post: Post;
};

const Mypost = ({ post }: PostProps) => {
  const { id, image, author, hasLiked, likesCount, description } = post;
  const handleDelete = async (postId: number) => {
    try {
      alert("Are you sure?");
      await deletePost(postId);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  //   const [active, setActive] = useState("default");

  //   const toggleActive = () => {
  //     setActive((prevColor) =>
  //       prevColor === "default" ? "destructive" : "default"
  //     );
  //   };

  const handleLike = async (postId: number) => {
    await createlikes(postId);
  };

  return (
    <div className="flex gap-6 border-b-gray-300 border-b">
      <div className="bg-gray-200 rounded-full w-12 h-12 flex mt-3  items-center justify-center p-3">
        <User width={20} />
      </div>
      <div
        key={id}
        className=" relative w-full cursor-pointer  mt-2   p-2"
      >
        <div className="absolute right-0 py-4 px-2 ">
          <Popover>
            <PopoverTrigger>
              <EllipsisVertical color="skyBlue" />
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
        <h3>{author}</h3>
        <div className=" flex  flex-col gap-3">
          <span className="text-sm">{description}</span>

          <Link href={`/posts/${id}`}>
            <span className="transform transition-transform duration-300  ">{`See more -->`}</span>
          </Link>
        </div>

        {image?.includes("/") && image && (
          <Image
            src={image}
            alt=""
            width={250}
            height={100}
          />
        )}

        <div className="flex gap-2 items-center rounded-xl  p-2 ">
          <Button
            type="submit"
            variant="ghost"
            className="p-0"
            onClick={() => handleLike(id)}
          >
            {hasLiked ? (
              <label>
                <Heart
                  color="skyBlue"
                  fill="skyBlue"
                />
                {likesCount}
              </label>
            ) : (
              <label>
                <Heart color="skyBlue" />
                {likesCount}
              </label>
            )}
          </Button>
          <div className="bg-gray-300 w-[1px] h-6 "></div>
          <MessageCircle color="skyBlue" />
          <div className="bg-gray-300 w-[1px] h-6"></div>
          <Import color="skyBlue" />
        </div>
      </div>
    </div>
  );
};

export default Mypost;
