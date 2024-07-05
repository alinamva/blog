import Post from "@/components/Post";
import PostForm from "@/components/PostForm";
import { getPosts } from "@/lib/actions";
import { validateRequest } from "@/lib/auth";

const Posts = async () => {
  const posts = await getPosts();
  console.log(posts);
  const { session } = await validateRequest();
  return (
    <div className=" gap-10 items-center  flex-1 flex-col justify-between">
      {session && <PostForm />}
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
