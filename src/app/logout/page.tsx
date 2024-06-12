import { Button } from "@/components/ui/button";
import { logout } from "@/lib/actions";
import React from "react";

const Logout = () => {
  return (
    <div>
      <form action={logout}>
        <Button type="submit">Logout</Button>
      </form>
    </div>
  );
};

export default Logout;
