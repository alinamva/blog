"use client";

import { createlikes } from "@/lib/actions";
import { Heart, Import, MessageCircle, User } from "lucide-react";
import { Button } from "./ui/button";
import { postsTable } from "@/lib/db/schema";
import Image from "next/image";

type PostProps = typeof postsTable.$inferSelect & {
  hasLiked?: number;
  likesCount?: number;
};

const Post = ({
  id,
  image,
  author,
  hasLiked,
  likesCount,
  description,
}: PostProps) => {
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
        <h3>{author}</h3>
        <span className="text-sm">{description}</span>
        <div className=" flex  flex-col gap-3"></div>
        {image.map((im) => (
          <Image
            src={im}
            alt=""
            width={250}
            height={100}
          />
        ))}

        <div className="flex gap-5 items-center rounded-xl  p-2 ">
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

export default Post;
