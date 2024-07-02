import Mypost from "@/components/Mypost";
import { validateRequest } from "@/lib/auth";
import db from "@/lib/db/migrate";
import { postsTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { User } from "lucide-react";

const Profile = async () => {
  const { session } = await validateRequest();
  if (!session?.userId) {
    console.log("User not authenticated");
    return <div>User not authenticated</div>;
  }
  const myPosts = await db
    .select()
    .from(postsTable)
    .where(eq(postsTable.authorId, session?.userId));
  return (
    <div className="p-5 flex flex-col gap-12">
      <div className="bg-gray-200 rounded-full w-40 h-40 flex mt-3  items-center justify-center p-3">
        <User size={48} />
      </div>
      <span>My posts</span>
      <div>
        {myPosts.map((post) => (
          // <li key={post.id}>{post.description}</li>
          <Mypost post={post} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
