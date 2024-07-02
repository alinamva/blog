import Link from "next/link";
import { validateRequest } from "@/lib/auth";
import Logout from "@/app/logout/page";
import {
  Earth,
  EllipsisVertical,
  Home,
  Menu,
  Settings,
  Sparkles,
  User,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import db from "@/lib/db/migrate";
import { usersTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
const Sidebar = async () => {
  const { session } = await validateRequest();
  let username = "";

  if (session?.userId) {
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, session.userId))
      .then((res) => res[0]);

    username = user?.username || "";
  }

  return (
    <div className="px-5 py-5 h-screen justify-between flex flex-col  min-w-64 fixed border-r-skyBlue/50 border-r-2">
      {/* <Link href="/">
        <div className="text-2xl font-light text-center">WRITEPRESS</div>
      </Link> */}
      <ul className="flex flex-col gap-5">
        <Link href="/">
          <li className="li-hover">
            <Home
              width={18}
              color="skyblue"
              // className="icon"
            />
            Home
          </li>
        </Link>
        <li>
          <Earth
            width={18}
            color="skyblue"
          />
          Explore
        </li>
        <li>
          <Sparkles
            width={18}
            color="skyblue"
          />
          For you
        </li>
      </ul>
      <div className="flex flex-col gap-5 ">
        {session && (
          <Link href="/profile">
            <div className="flex gap-4 items-center">
              <div className="bg-gray-200 rounded-full w-10 h-10 flex   items-center justify-center p-3">
                <User width={22} />
              </div>
              <span className="text-sm font-medium">{username}</span>
            </div>
          </Link>
        )}
        <div className="flex gap-2 items-center">
          <Settings
            width={18}
            color="skyblue"
          />
          <label className="flex justify-between w-full">
            Settings
            <DropdownMenu>
              <DropdownMenuTrigger>
                <EllipsisVertical />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
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
          </label>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
