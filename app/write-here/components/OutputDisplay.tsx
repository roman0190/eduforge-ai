// src/components/OutputDisplay.tsx
import React from "react";
import { Button, Typography } from "antd";
import { CopyOutlined, DownloadOutlined } from "@ant-design/icons";
// import Image from "next/image";

const { Paragraph } = Typography;

interface OutputDisplayProps {
  output: string;
  categoryName: string;
  topicName: string;
  handleCopy: () => void;
  handleDownloadPDF: () => void;
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({
  output,
  categoryName,
  topicName,
  handleCopy,
  handleDownloadPDF,
}) => {
  return (
    <div className="output my-10">
      {output ? (
        <div>
          <div id="output-section">
            <div className="text-center text-green-300 mb-5 text-xl font-bold">
              {categoryName} : {topicName}
            </div>
            <div className="relative border-1 border-slate-400 p-4 bg-slate-100 shadow-lg">
              <img
                src="/logoEF.svg"
                alt="alt"
                className="absolute top-0 left-0 w-full h-full opacity-20 object-contain"
              />
              <Paragraph style={{ whiteSpace: "pre-wrap" }}>{output}</Paragraph>
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            <Button type="primary" icon={<CopyOutlined />} onClick={handleCopy}>
              Copy
            </Button>
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              onClick={handleDownloadPDF}
            >
              Download PDF
            </Button>
          </div>
        </div>
      ) : (
        <div>No output available.</div>
      )}
    </div>
  );
};

export default OutputDisplay;
