// components/OutputDisplay.tsx
import React from "react";
import { Button, Typography, Card, Divider, Tooltip, message } from "antd";
import {
  CopyOutlined,
  FileTextOutlined,
  FilePdfOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { downloadPDF } from "../utils/downloadPDF";

const { Text } = Typography;

interface OutputDisplayProps {
  output: string;
  categoryName: string;
  topicName: string;
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({
  output,
  categoryName,
  topicName,
}) => {
  // For showing success messages
  const [messageApi, contextHolder] = message.useMessage();

  // Calculate word count for display
  const wordCount = output ? output.split(/\s+/).filter(Boolean).length : 0;

  // Handle copying text to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      messageApi.success("Content copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy:", error);
      messageApi.error("Failed to copy content");
    }
  };

  // Handle PDF download
  const handleDownloadPDF = () => {
    try {
      messageApi.loading({ content: "Generating PDF...", key: "pdfDownload" });
      downloadPDF(
        output,
        `${categoryName.toLocaleUpperCase()} ${topicName.toLocaleUpperCase()}.pdf`
      )
        .then(() => {
          messageApi.success({
            content: "PDF downloaded successfully!",
            key: "pdfDownload",
            duration: 2,
          });
        })
        .catch((error) => {
          console.error("PDF generation error:", error);
          messageApi.error({
            content: "Failed to generate PDF. Please try again.",
            key: "pdfDownload",
            duration: 3,
          });
        });
    } catch (error) {
      console.error("PDF error:", error);
      messageApi.error("Failed to generate PDF");
    }
  };

  // Show placeholder when no content is available
  if (!output) {
    return (
      <>
        {contextHolder}
        <Card
          title="Generated Content"
          className="shadow-lg border border-gray-200"
          headStyle={{
            backgroundColor: "#f8fafc",
            borderBottom: "1px solid #e2e8f0",
            fontSize: "18px",
            fontWeight: "600",
          }}
        >
          <div className="text-center py-16">
            <FileTextOutlined className="text-6xl text-gray-300 mb-4" />
            <Text className="text-gray-500 text-lg block">
              Your generated content will appear here
            </Text>
            <Text className="text-gray-400 text-sm mt-2">
              Complete the form and click &ldquo;Generate Content&rdquo;
            </Text>{" "}
            <div className="mt-6">
              <Link href="/help">
                <Button
                  type="link"
                  icon={<QuestionCircleOutlined className="mr-1" />}
                  className="text-blue-500"
                >
                  Need help? View our guide
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </>
    );
  }

  // Main output display with content
  return (
    <>
      {contextHolder}
      <Card
        title={
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="mr-2 text-base sm:text-lg">
              Generated Content:
            </span>
            <span className="text-blue-600 font-medium text-sm sm:text-base">
              {`${categoryName} - ${topicName.toLocaleUpperCase()}`}
            </span>
          </div>
        }
        className="shadow-lg border border-gray-200"
        headStyle={{
          backgroundColor: "#f8fafc",
          borderBottom: "1px solid #e2e8f0",
          padding: "12px 16px",
          fontSize: "16px",
          fontWeight: "600",
        }}
        extra={
          <div className="flex flex-wrap gap-2">
            <Tooltip title="Copy to clipboard">
              <Button
                icon={<CopyOutlined />}
                onClick={handleCopy}
                size="middle"
                type="default"
                className="hover:text-blue-600 hover:border-blue-600 min-w-0"
              >
                <span className="hidden sm:inline">Copy</span>
              </Button>
            </Tooltip>

            <Tooltip title="Download as PDF">
              <Button
                icon={<FilePdfOutlined />}
                onClick={handleDownloadPDF}
                size="middle"
                type="primary"
                style={{
                  backgroundColor: "#2563eb",
                  borderColor: "#2563eb",
                }}
                className="hover:opacity-90 min-w-0"
              >
                <span className="hidden sm:inline">PDF</span>
              </Button>
            </Tooltip>

            <Tooltip title="View Help Guide">
              <Link href="/help">
                <Button
                  icon={<QuestionCircleOutlined />}
                  size="middle"
                  type="text"
                  className="text-blue-500 hover:text-blue-700 min-w-0"
                />
              </Link>
            </Tooltip>
          </div>
        }
      >
        {/* Content container - Important for PDF generation */}
        <div id="output-section">
          <div className="content-text">
            <div
              className="text-gray-800 leading-relaxed"
              style={{
                whiteSpace: "pre-wrap",
                fontSize: "16px",
                lineHeight: "1.8",
                letterSpacing: "0.3px",
                wordWrap: "break-word",
                textAlign: "justify",
                fontFamily:
                  "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              }}
            >
              {output}
            </div>
          </div>
        </div>

        <Divider />

        {/* Footer with metadata */}
        <div className="flex justify-between items-center text-gray-500 text-sm px-2">
          <div>Generated by EduForge AI</div>
          <div>Word count: {wordCount} words</div>
        </div>
      </Card>
    </>
  );
};

export default OutputDisplay;
