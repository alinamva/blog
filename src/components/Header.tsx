import Image from "next/image";
import logo from "../../public/logo.png";
import Link from "next/link";

const Header = () => {
  return (
    <div className="p-10 w-full  ">
      <Link href="/">
        <Image src={logo} alt="logo" width={120} height={40} />
      </Link>
    </div>
  );
};

export default Header;
