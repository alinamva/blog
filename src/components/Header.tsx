import Link from "next/link";
import { validateRequest } from "@/lib/auth";
import Logout from "@/app/logout/page";
import { Facebook, Instagram, Menu, Twitter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const Header = async () => {
  const { session } = await validateRequest();

  return (
    <div className="px-10 py-5 w-full items-center bg-skyBlue text-white flex justify-between">
      <div className="flex gap-2">
        <Instagram width={20} />
        <Facebook width={20} />
        <Twitter width={20} />
      </div>
      <Link href="/">
        <div className="text-2xl font-light text-center">WRITEPRESS</div>
      </Link>
      <div className="flex gap-5 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Menu />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {session && (
              <>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <Link href="/myposts">
                  <DropdownMenuItem>My Posts</DropdownMenuItem>
                </Link>
                <DropdownMenuItem>Settings</DropdownMenuItem>
              </>
            )}
            {!session ? (
              <Link href="/signup">
                <DropdownMenuItem>
                  Sign Up / Sign In
                  <div className="flex text-center items-center"></div>
                </DropdownMenuItem>
              </Link>
            ) : (
              <DropdownMenuItem>
                <Logout />
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Header;
