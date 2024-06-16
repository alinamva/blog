import { validateRequest } from "@/lib/auth";
import db from "@/lib/db/migrate";
import { postsTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const MyPosts = async () => {
  const { session } = await validateRequest();
  if (!session?.userId) {
    console.log("User not authenticated");
    return <div>User not authenticated</div>;
  }
  const myPosts = await db
    .select()
    .from(postsTable)
    .where(eq(postsTable.author, session?.userId));
  console.log(myPosts);
  return (
    <>
      {myPosts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <ul>
          {myPosts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default MyPosts;
