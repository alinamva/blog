"use client";
import { createPost } from "@/lib/actions";
import React, { useEffect, useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import Upload from "./Upload";

const PostForm = () => {
  return (
    <form action={createPost}>
      <div className="flex flex-col justify-end items-end min-h-[120px] w-full rounded-md border border-input bg-background pb-5  text-sm ring-offset-background  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-skyBlue disabled:cursor-not-allowed disabled:opacity-50">
        <Textarea
          name="description"
          className="whitespace-pre-wrap"
        />
        <div className="flex justify-between w-full px-5 items-end">
          <Upload />
          <Button
            type="submit"
            className="bg-skyBlue text-white h-full px-2 py-1  gap-1 text-xs  "
          >
            Share
            <Send width={16} />
          </Button>
        </div>
      </div>
    </form>
  );
};

export default PostForm;
