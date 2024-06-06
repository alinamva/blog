import Post from "@/components/Post";

import db from "@/lib/db/migrate";
import { Post as PostType, postsTable } from "@/lib/db/schema";

const Posts = async () => {
  const posts: PostType[] = await db.select().from(postsTable);
  posts.map((post) => console.log(post));
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 items-center justify-between">
      {posts?.map(({ id, ...post }) => (
        <Post key={id} id={id} {...post} />
      ))}
    </div>
  );
};

export default Posts;
