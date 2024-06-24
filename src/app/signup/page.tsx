import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signup } from "@/lib/actions";
import { validateRequest } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  const { session } = await validateRequest();
  if (session) {
    redirect("/");
  }
  return (
    <div className="text-munssel flex flex-col w-1/3 m-auto gap-6">
      <h1>Create an account</h1>

      <form
        action={signup}
        className="flex w-full flex-col"
      >
        <label htmlFor="username">Username</label>
        <Input
          name="username"
          id="username"
        />
        <br />
        <label htmlFor="password">Password</label>
        <Input
          type="password"
          name="password_hash"
          id="password"
        />
        <br />
        <span>
          Already have an account? <Link href="/login">Sign in</Link>
        </span>
        <Button type="submit">Continue</Button>
      </form>
    </div>
  );
}
