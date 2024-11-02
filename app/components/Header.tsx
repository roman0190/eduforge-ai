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
          <div className="flex  justify-center md:block ">
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
          <div className="h-full flex text-xs md:min-h-[4.8rem] items-end justify-center">
            <span className="font-serif text-sm">Adhayan Academic Coaching<span className="text-[0.5rem]">{"(EduForge.ai)"}</span></span>
          </div>
        </div>
        <div className="text-xs mt-2 md:mt-0 text-gray-600 flex gap-2">
          Developed by <span className="font-semibold">Roman Howladar</span>
          {"-"}
          <div className="hover:underline flex items-center space-x-1">
            <Link
              href={
                "https://www.facebook.com/mahamudulhasan.roman.73?mibextid=LQQJ4d"
              }
            >
              <FacebookOutlined className="text-blue-500" />
            </Link>
            <Link href={"https://github.com/roman0190"}>
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
