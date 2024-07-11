import { createComments } from "@/lib/actions";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const CommentForm = ({ postId }: { postId: string }) => {
  const creatFormWithPostId = createComments.bind(null, postId);
  return (
    <form action={creatFormWithPostId}>
      <Input name="comment" />
      <Button type="submit">Share</Button>
    </form>
  );
};

export default CommentForm;
