import { Post as PostType } from "@/lib/db/schema";
import React from "react";

const Post = ({ id }: PostType) => {
  return <div key={id}>Post</div>;
};

export default Post;
