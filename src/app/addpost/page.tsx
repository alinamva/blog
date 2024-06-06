import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createPost } from "@/lib/actions";

const Addpost = () => {
  return (
    <form action={createPost}>
      <div className="flex flex-col gap-6 justify-start items-center border border-gray-500 rounded-xl p-6 ">
        <Input placeholder="Enter title" name="title" />
        <Input placeholder="Enter Description" name="description" />
        <Input placeholder="Enter Image Url" name="image" />
        <Input placeholder="Enter Author Name" name="author" />

        <Button type="submit">Create Post</Button>
      </div>
    </form>
  );
};

export default Addpost;
