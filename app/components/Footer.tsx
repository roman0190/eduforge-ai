"use client";
import React from "react";
import { Layout, Space, Divider } from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  MailOutlined,
  InfoCircleOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
const { Footer } = Layout;

const EduForgeFooter: React.FC = () => {
  return (
    <Footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              EduForge AI
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Your Study Companion - Helping students succeed with AI-driven
              tools for writing, studying, and more.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="text-md font-semibold text-gray-800 mb-4">
              Quick Links
            </h4>
            <Space direction="vertical" size="small" className="w-full">
              <a
                href="/about"
                className="flex items-center justify-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <InfoCircleOutlined />
                About Us
              </a>
              <a
                href="/privacy-policy"
                className="flex items-center justify-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <SafetyCertificateOutlined />
                Privacy Policy
              </a>
              <a
                href="mailto:adhayansikkhaporibar@gmail.com"
                className="flex items-center justify-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <MailOutlined />
                Contact Us
              </a>
            </Space>
          </div>

          {/* Social Media */}
          <div className="text-center md:text-right">
            <h4 className="text-md font-semibold text-gray-800 mb-4">
              Follow Us
            </h4>
            <Space size="large" className="justify-center md:justify-end">
              <a
                href="https://www.facebook.com/profile.php?id=100089255702928"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 transition-colors"
              >
                <FacebookOutlined className="text-xl" />
              </a>
              <a
                href="https://twitter.com/eduforge"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-500 transition-colors"
              >
                <TwitterOutlined className="text-xl" />
              </a>
              <a
                href="https://www.instagram.com/eduforge"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-500 hover:text-pink-600 transition-colors"
              >
                <InstagramOutlined className="text-xl" />
              </a>
            </Space>
          </div>
        </div>

        <Divider className="my-6" />

        {/* Copyright */}
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} EduForge.AI. All rights reserved.
          </p>
          <p className="text-xs text-gray-500">
            Powered by Google Gemini AI & Next.js
          </p>
        </div>
      </div>
    </Footer>
  );
};

export default EduForgeFooter;
