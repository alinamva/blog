import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createPost } from "@/lib/actions";

const Addpost = () => {
  return (
    <form
      action={createPost}
      className="flex w-full"
    >
      <div className="flex flex-col m-auto gap-6 justify-start items-center  w-2/3 rounded-xl p-6 ">
        <Input
          placeholder="Enter title"
          name="title"
        />
        <Textarea
          placeholder="Enter Description"
          name="description"
        />
        <Input
          placeholder="Enter Image Url"
          name="image"
        />
        <Input
          placeholder="Enter Author Name"
          name="author"
        />

        <Button type="submit">Create Post</Button>
      </div>
    </form>
  );
};

export default Addpost;
