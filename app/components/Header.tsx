import React from "react";
import Link from "next/link";
import {
  FacebookOutlined,
  GithubOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import Image from "next/image";

const Header: React.FC = () => {
  return (
    <header className="bg-gray-200 text-gray-800  shadow-2xl border-b-2 border-gray-500">
      <div className="mx-[5%] flex flex-col md:flex-row items-center justify-between ">
        <div className="font-bold md:flex items-center ">
          <div className="flex justify-center md:block md:mr-2 md:py-1">
            <Link
              href={"https://www.facebook.com/profile.php?id=100089255702928"}
            >
              <Image
                src="/logo.png"
                alt="alt"
                width={1450}
                height={1480}
                className="w-20 h-20 "
              />
            </Link>
          </div>
          <div className="h-full flex text-xs justify-center text-gray-700 ">
            <span className="font-serif text-sm md:text-xl">
              Adhayan Academic Coaching
            </span>
          </div>
        </div>
        <div className="text-xs mt-2 md:mt-0 text-gray-600 flex gap-2">
          Developed by <span className="font-semibold">Xenon24</span>
          {"-"}
          <div className="hover:underline flex items-center space-x-1">
            <Link
              href={"https://www.facebook.com/profile.php?id=61568169571150"}
            >
              <FacebookOutlined className="text-blue-500" />
            </Link>
            <Link href={""}>
              <GithubOutlined className="text-blue-500" />
            </Link>
            <Link href={""}>
              <LinkedinOutlined className="text-blue-500" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
