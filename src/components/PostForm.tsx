"use client";
import { createPost } from "@/lib/actions";
import React, { useEffect, useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import Upload from "./Upload";

const PostForm = () => {
  const [imageUrl, setImageUrl] = useState<string[]>([]);
  const createPostWithImages = createPost.bind(null, imageUrl);
  const handleImageUpload = (url: string) => {
    setImageUrl((prev) => {
      prev.push(url);
      return prev;
    });
  };
  console.log(imageUrl);
  //   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     const formData = new FormData(e.currentTarget);
  //     if (imageUrl) {
  //       formData.append("image", imageUrl);
  //     }
  //     let image = formData.get("image");
  //     console.log("a", image);
  //     // for (let [key, value] of formData.entries()) {
  //     //   console.log(`${key}: ${value}`);
  //     // }
  //     await createPost(formData);
  //   };
  return (
    <form action={createPostWithImages}>
      <div className="flex flex-col justify-end items-end min-h-[120px] w-full rounded-md border border-input bg-background pb-5  text-sm ring-offset-background  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-skyBlue disabled:cursor-not-allowed disabled:opacity-50">
        <Textarea name="description" />
        <div className="flex justify-between w-full px-5">
          <Button
            type="submit"
            variant="ghost"
            className="bg-skyBlue text-white  gap-1 text-sm w-24 "
          >
            Share
            <Send width={18} />
          </Button>
          <Upload handleImageUpload={handleImageUpload} />
        </div>
      </div>
    </form>
  );
};

export default PostForm;
