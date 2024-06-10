import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signup } from "@/lib/actions";

export default function Page() {
  return (
    <div className="text-munssel flex flex-col w-1/3 m-auto gap-6">
      <h1>Create an account</h1>

      <form action={signup} className="flex w-full flex-col">
        <label htmlFor="username">Username</label>
        <Input name="username" id="username" />
        <br />
        <label htmlFor="password">Password</label>
        <Input type="password" name="password_hash" id="password" />
        <br />
        <Button type="submit">Continue</Button>
      </form>
    </div>
  );
}
