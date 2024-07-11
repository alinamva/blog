import db from "@/lib/db/migrate";
import { commentsTable, postsTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const Comments = async ({ id }: { id: number }) => {
  const comments = await db
    .select()
    .from(commentsTable)
    .where(eq(postsTable.id, id));
  return (
    <div>
      <ul>
        {comments?.map(({ comment }) => (
          <li>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
