import React from "react";
import Link from "next/link";
import { FacebookOutlined } from "@ant-design/icons";
import Image from "next/image";

const Header: React.FC = () => {
  return (
    <header className="bg-gray-200 text-gray-800 py-4 shadow-2xl border-b-2 border-gray-500">
      <div className="mx-[5%] flex flex-col md:flex-row items-center justify-between ">
        <div className="font-bold md:flex bg-slate-200 items-center">
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
          <div className="h-full flex text-xs md:min-h-[4.8rem] items-end justify-center">
            <span className="font-serif ">EduForge.Ai</span>
          </div>
        </div>
        <div className="text-sm mt-2 md:mt-0 text-gray-800 flex gap-2">
          Developed by <span className="font-semibold">Roman Howladar</span>
          {"-"}
          <Link
            href={"https://www.facebook.com/mahamudulhasan.roman.73?mibextid=LQQJ4d"}
            target="_blank"
          >
            <div className="hover:underline flex items-center space-x-1">
              <FacebookOutlined className="text-blue-500" />
              <span>Facebook</span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
