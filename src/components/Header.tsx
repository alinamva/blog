import Image from "next/image";
import logo from "../../public/logo.png";
import Link from "next/link";
import { validateRequest } from "@/lib/auth";
import Logout from "@/app/logout/page";

const Header = async () => {
  const { session } = await validateRequest();

  return (
    <div className="p-10 w-full flex justify-between  text-munssel ">
      <Link href="/">
        <Image
          src={logo}
          alt="logo"
          width={120}
          height={40}
        />
      </Link>
      <div className="flex gap-5">
        {!session ? (
          <>
            <Link href="/signup">
              <label>Sign Up</label>
            </Link>
            <Link href="/login">
              <label>Login</label>
            </Link>
          </>
        ) : (
          <Logout />
        )}
      </div>
    </div>
  );
};

export default Header;
