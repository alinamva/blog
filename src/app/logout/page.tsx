import { logout } from "@/lib/actions";
import React from "react";

const Logout = () => {
  return (
    <div>
      <form action={logout}>
        <button type="submit">Logout</button>
      </form>
    </div>
  );
};

export default Logout;
