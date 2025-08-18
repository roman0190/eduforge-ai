"use client";
import React from "react";
import { Card, Typography, Button, Divider } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";

const { Title, Text } = Typography;

const HelpPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link href="/write-here">
              <Button
                icon={<ArrowLeftOutlined />}
                type="text"
                size="large"
                className="mr-4 text-blue-600 hover:text-blue-800"
              >
                Back to Writer
              </Button>
            </Link>
            <Title level={2} className="!m-0">
              Help & Guidelines
            </Title>
          </div>
        </div>

        <Divider />

        {/* How to Use Section */}
        <div className="mb-8">
          <Title level={3} className="mb-6">
            How to Use EduForge AI
          </Title>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold shrink-0">
                  1
                </div>
                <div>
                  <Text className="block text-lg font-medium mb-1">
                    Enter your topic
                  </Text>
                  <Text className="text-gray-600">
                    Type your topic in the text field. Be specific to get more
                    relevant results.
                  </Text>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold shrink-0">
                  2
                </div>
                <div>
                  <Text className="block text-lg font-medium mb-1">
                    Select content category
                  </Text>
                  <Text className="text-gray-600">
                    Choose the type of content you need (Essay, Report,
                    Application, etc).
                  </Text>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold shrink-0">
                  3
                </div>
                <div>
                  <Text className="block text-lg font-medium mb-1">
                    Choose writing style/mode
                  </Text>
                  <Text className="text-gray-600">
                    Select the complexity level of language for your content.
                  </Text>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold shrink-0">
                  4
                </div>
                <div>
                  <Text className="block text-lg font-medium mb-1">
                    Generate and download
                  </Text>
                  <Text className="text-gray-600">
                    Click &quot;Generate Content&quot; and then download as PDF or copy to
                    clipboard.
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Divider />

        {/* Content Types Section */}
        <div className="mb-8">
          <Title level={3} className="mb-6">
            Content Types and Guidelines
          </Title>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-blue-50 border-blue-200">
              <div className="mb-4">
                <Text className="text-lg font-medium">Paragraph</Text>
                <div className="mt-2 text-gray-700">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>200-300 words in length</li>
                    <li>Single paragraph format</li>
                    <li>Concise introduction and explanation</li>
                  </ul>
                </div>
              </div>

              <div className="mb-4">
                <Text className="text-lg font-medium">Essay</Text>
                <div className="mt-2 text-gray-700">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Minimum 600 words</li>
                    <li>
                      Multiple paragraphs with introduction, body, conclusion
                    </li>
                    <li>Formal academic style</li>
                  </ul>
                </div>
              </div>

              <div>
                <Text className="text-lg font-medium">Report</Text>
                <div className="mt-2 text-gray-700">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>120-150 words</li>
                    <li>No first-person references (I, we)</li>
                    <li>Uses passive voice/indirect speech</li>
                    <li>Includes heading with Staff/Reporter details</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="bg-blue-50 border-blue-200">
              <div className="mb-4">
                <Text className="text-lg font-medium">Application</Text>
                <div className="mt-2 text-gray-700">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Formal format</li>
                    <li>Starts with date</li>
                    <li>Structured with proper salutations</li>
                    <li>Clear and concise request</li>
                  </ul>
                </div>
              </div>

              <div className="mb-4">
                <Text className="text-lg font-medium">Story</Text>
                <div className="mt-2 text-gray-700">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Minimum 400 words</li>
                    <li>Creative narrative</li>
                    <li>Engaging beginning, middle, and end</li>
                  </ul>
                </div>
              </div>

              <div>
                <Text className="text-lg font-medium">Email</Text>
                <div className="mt-2 text-gray-700">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Maximum 200 words</li>
                    <li>Proper email format with greeting and sign-off</li>
                    <li>Clear and concise communication</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Tips Section */}
        <Card className="bg-gray-50 border-gray-200 mb-8">
          <Title level={4} className="mb-4">
            Pro Tips
          </Title>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Be specific with your topic for better results</li>
            <li>Use the appropriate content type for your needs</li>
            <li>Review and edit generated content before using</li>
            <li>Download your content as PDF for professional formatting</li>
            <li>
              Try different writing styles if you&apos;re not satisfied with results
            </li>
          </ul>
        </Card>

        {/* Return Button */}
        <div className="text-center mt-8">
          <Link href="/write-here">
            <Button
              type="primary"
              size="large"
              className="px-8"
              style={{
                backgroundColor: "#2563eb",
                borderColor: "#2563eb",
              }}
            >
              Return to Writer
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
