"use client";
import React from "react";
import { Layout, Space } from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
const { Footer } = Layout;

const EduForgeFooter: React.FC = () => {
  return (
    <Footer className="bg-gray-200 text-gray-800 border-t-2 border-gray-500 shadow-2xl">
      <div className="flex flex-col justify-center items-center">
        <span className=" flex justify-center text-md  md:text-lg font-semibold text-gray-600 ">
          EduForge-Your Study Companion
        </span>
        <span className="flex justify-cente text-xs md:text-sm mb-4 text-gray-600 px-[20%] ">
          Helping students succeed with AI-driven tools for writing, studying,
          and more.
        </span>
        <Space size="large" className="mb-4">
          <a
            href="mailto:adhayansikkhaporibar@gmail.com"
            className="hover:underline"
            aria-label="Email Us"
          >
            Email Us
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=100089255702928"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
            aria-label="Facebook"
          >
            <FacebookOutlined />
          </a>
          <a
            href="https://twitter.com/eduforge"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
            aria-label="Twitter"
          >
            <TwitterOutlined />
          </a>
          <a
            href="https://www.instagram.com/eduforge"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
            aria-label="Instagram"
          >
            <InstagramOutlined />
          </a>
          <a href="/about" className="hover:underline" aria-label="About Us">
            About Us
          </a>
          <a
            href="/privacy-policy"
            className="hover:underline"
            aria-label="Privacy Policy"
          >
            Privacy Policy
          </a>
        </Space>
        <span className="text-xs text-gray-800">
          © {new Date().getFullYear()} EduForge.Ai. All rights reserved.
        </span>
        <br />
        <span className="text-xs text-gray-800">
          Powered by OpenAI and Pollinations.ai
        </span>
      </div>
    </Footer>
  );
};

export default EduForgeFooter;
