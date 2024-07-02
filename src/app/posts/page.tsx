import Post from "@/components/Post";
import Upload from "@/components/Upload";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createPost, getPosts } from "@/lib/actions";
import { validateRequest } from "@/lib/auth";
import { Send } from "lucide-react";

const Posts = async () => {
  const posts = await getPosts();
  const { session } = await validateRequest();

  return (
    <div className=" gap-10 items-center  flex-1 flex-col justify-between">
      {session && (
        <form action={createPost}>
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
              <Button type="button">Image</Button>
              <Upload />
            </div>
          </div>
        </form>
      )}
      {posts.length > 0
        ? posts.map((post) => (
            <Post
              key={post.id}
              {...post}
            />
          ))
        : "Post Yoxdur"}

      {/* Pretty ts yukleyersen extensiondu
       */}
    </div>
  );
};

export default Posts;
