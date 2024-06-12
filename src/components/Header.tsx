import Image from "next/image";
import logo from "../../public/logo.png";
import Link from "next/link";

const Header = () => {
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
        <Link href="/signup">
          <label>Sign Up</label>
        </Link>
        <Link href="/login">
          <label>Login</label>
        </Link>
      </div>
    </div>
  );
};

export default Header;
