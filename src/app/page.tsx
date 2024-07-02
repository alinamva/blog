import { Button } from "@/components/ui/button";

import Link from "next/link";
import Posts from "./posts/page";
import { deleteAllPosts, logout } from "@/lib/actions";
import { cookies } from "next/headers";

export default async function Home() {
  const sessionId = cookies().get("session")?.value;
  // console.log(sessionId);

  return (
    <main className="container flex gap-5 flex-col justify-between py-7 min-h-screen border-r-skyBlue/50 border-r-2 ">
      {/* <div className="flex justify-end w-full gap-4">
        <Link href="/addpost">
          <Button>Add a post</Button>
        </Link>
        <form action={deleteAllPosts}>
          <Button
            variant="destructive"
            type="submit"
          >
            Delete all posts
          </Button>
        </form>
      </div> */}
      <h3 className="text-skyBlue">Home</h3>

      <Posts />
    </main>
  );
}
