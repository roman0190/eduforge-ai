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
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <Link
              href={"https://www.facebook.com/profile.php?id=100089255702928"}
              className="hover:opacity-80 transition-opacity"
            >
              <Image
                src="/logo.png"
                alt="Adhayan Academic Coaching Logo"
                width={60}
                height={60}
                className="rounded-lg"
              />
            </Link>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                Adhayan Academic Coaching
              </h1>
              <p className="text-sm text-gray-600">Educational Excellence</p>
            </div>
          </div>

          {/* Developer Info and Social Links */}
          <div className="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0">
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-600">
                Developed by{" "}
                <span className="font-semibold text-gray-800">
                  Roman Howladar
                </span>
              </p>
              <div className="flex items-center justify-center md:justify-end space-x-3 mt-1">
                <Link
                  href={
                    "https://www.facebook.com/profile.php?id=61568169571150"
                  }
                  className="text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <FacebookOutlined className="text-lg" />
                </Link>
                <Link
                  href={"https://github.com/roman0190"}
                  className="text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <GithubOutlined className="text-lg" />
                </Link>
                <Link
                  href={"https://linkedin.com/in/roman-howladar"}
                  className="text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <LinkedinOutlined className="text-lg" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
