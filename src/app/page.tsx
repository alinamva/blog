import { Button } from "@/components/ui/button";

import Link from "next/link";
import Posts from "./posts/page";
import { deleteAllPosts, logout } from "@/lib/actions";
import { cookies } from "next/headers";

export default async function Home() {
  const sessionId = cookies().get("session")?.value;
  console.log(sessionId);
  return (
    <main className="container flex gap-10 flex-col items-center justify-between px-24">
      <div className="flex justify-end w-full gap-4">
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
      </div>

      <Posts />
    </main>
  );
}
