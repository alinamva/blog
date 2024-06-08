"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { deletePost } from "@/lib/actions";
import { EllipsisVertical } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const Post = ({
  title,
  id,
  image,
  author,
}: {
  title: string;
  id: number;
  image: string | null;
  author: string;
}) => {
  const handleDelete = async (postId: number) => {
    try {
      alert("Are you sure?");
      await deletePost(postId);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      key={id}
      className="rounded-xl relative border-munssel cursor-pointer border"
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
                <li className="p-4 cursor-pointer hover:bg-midnightGreen hover:text-munssel duration-150 ">
                  Edit
                </li>
              </Link>
            </ul>
          </PopoverContent>
        </Popover>
      </div>
      {image && (
        <Image
          src={image}
          alt=""
          width={350}
          height={300}
          className="rounded-t-xl"
        />
      )}
      <div className="p-4 text-munssel flex  flex-col gap-3">
        <h2>{title}</h2>
        <span>{author}</span>
        <Link href={`/posts/${id}`}>
          <span className="transform transition-transform duration-300  hover:text-white">{`See more -->`}</span>
        </Link>
      </div>
    </div>
  );
};

export default Post;
