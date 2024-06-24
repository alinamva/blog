import Post from "@/components/Post";
import { getPosts } from "@/lib/actions";

import db from "@/lib/db/migrate";
import { Post as PostType, postsTable } from "@/lib/db/schema";

const Posts = async () => {
  // const posts: PostType[] = await db.select().from(postsTable);
  const posts = await getPosts();
  console.log(posts);
  return (
    <div className="max-w-[900px] gap-5 items-center flex flex-col justify-between">
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
