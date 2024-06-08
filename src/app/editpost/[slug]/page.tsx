import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updatePost } from "@/lib/actions";
import db from "@/lib/db/migrate";
import { postsTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
const EditPost = async ({ params }) => {
  const post = await db
    .select()
    .from(postsTable)
    .where(eq(postsTable.id, parseInt(params.slug)))
    .then((rows) => rows[0]);

  console.log(post);
  if (!post) {
    return <div>Post not found</div>;
  }

  // const handleUpdate = async (postId: number) => {
  //   try {
  //     console.log(post);
  //     await updatePost(postId);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  return (
    <form
      // onSubmit={() => handleUpdate(post.id)}
      className="flex w-full"
    >
      <div className="flex flex-col m-auto gap-6 justify-start items-center  w-2/3 rounded-xl p-6 ">
        <Input
          placeholder="Enter title"
          name="title"
          value={post.title}
        />
        <Textarea
          placeholder="Enter Description"
          name="description"
          value={post.description}
        />
        <Input
          placeholder="Enter Image Url"
          name="image"
          value={post.image}
        />
        <Input
          placeholder="Enter Author Name"
          name="author"
          value={post.author}
        />

        <Button type="submit">Update Post</Button>
      </div>
    </form>
  );
};

export default EditPost;
