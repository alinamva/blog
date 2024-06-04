import Post from "@/components/Post";
import db from "@/lib/db/migrate";
import { Post as PostType, postsTable } from "@/lib/db/schema";
import createPost from "../app/actions";
// import axios from "axios";

export default async function Home() {
  // const posts: PostType[] = (await axios("http://localhost:3000/api/post"))
  //   .data;
  const posts: PostType[] = await db.select().from(postsTable);
  return (
    <main className="container flex min-h-screen flex-col items-center justify-between p-24">
      {posts?.map(({ id, ...post }) => (
        <Post
          key={id}
          id={id}
          {...post}
        />
      ))}
      <form action={createPost}>
        <button
          type="submit"
          onClick={createPost}
        >
          Create Post
        </button>
      </form>
    </main>
  );
}
