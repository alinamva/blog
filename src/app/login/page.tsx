import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login } from "@/lib/actions";

export default async function Page() {
  return (
    <div className="text-munssel flex flex-col w-[80%] md:w-1/3 m-auto gap-6">
      <h1>Sign in</h1>

      <form
        action={login}
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
          name="password"
          id="password"
        />
        <br />
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
}
