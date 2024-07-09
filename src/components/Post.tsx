"use client";

import { createlikes } from "@/lib/actions";
import { Dot, Heart, Import, MessageCircle, User } from "lucide-react";
import { Button } from "./ui/button";
import { postsTable } from "@/lib/db/schema";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { formatDistanceToNow, subDays } from "date-fns";
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
  createdAt,
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
        <div className="flex gap-1 items-center">
          <h2>{author}</h2>
          <Dot />
          <div className="text-xs text-skyBlue/90">
            {formatDistanceToNow(new Date(createdAt), {
              addSuffix: true,
            }).replace("about", "")}
          </div>
        </div>
        <span className="text-sm">{description}</span>
        <div className=" flex  flex-col gap-3"></div>

        <Carousel className="w-full">
          <CarouselContent>
            {image.map((im) => (
              <CarouselItem
                className="pl-1 md:basis-1/2 lg:basis-1/3"
                key={im}
              >
                <Image
                  src={im}
                  alt=""
                  width={250}
                  height={100}
                  className="object-cover w-[250px] h-[250px]"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
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
