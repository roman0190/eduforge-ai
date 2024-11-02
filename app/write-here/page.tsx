"use client";
import React, { useState } from "react";
import { Button, Spin, Modal } from "antd";
import axios from "axios";
import { copyToClipboard } from "./utils/copyToClipboard";
import { downloadPDF } from "./utils/downloadPDF";
import ErrorAlert from "./components/ErrorAlert";
import TopicInput from "./components/TopicInput";
import CategorySelect from "./components/CategorySelect";
import LevelSelect from "./components/LevelSelect";
import OutputDisplay from "./components/OutputDisplay";

const WriteHere: React.FC = () => {
  const [topicName, setTopicName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [levelName, setLevelName] = useState("");
  const [output, setOutput] = useState("");
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT || "defaultApiUrl";
  const apiModel = process.env.NEXT_PUBLIC_API_MODEL;

  const handleCopy = () => {
    copyToClipboard(output, () => {
      Modal.success({
        title: "Copied!",
        content: "Output has been successfully copied to the clipboard!",
      });
    });
  };

  const handleDownloadPDF = () => {
    downloadPDF("output-section", `${categoryName} ${topicName}.pdf`);
  };

  const handleSubmit = async () => {
    const errors: string[] = [];
    if (!topicName) errors.push("Please enter a topic name.");
    if (!categoryName) errors.push("Please select a category.");
    if (!levelName) errors.push("Please select a mode.");

    if (errors.length > 0) {
      setErrorMessages(errors);
    } else {
      setErrorMessages([]);
      setLoading(true);

      try {
        const promptTemplate = process.env.NEXT_PUBLIC_PROMPT_TEMPLATE;

        if (!promptTemplate) {
          setErrorMessages([
            "Prompt template is missing. Please check your environment variables.",
          ]);
          return;
        }
        const promptMessage = promptTemplate
          .replace("{category}", categoryName)
          .replace("{level}", levelName)
          .replace("{topic}", topicName);
        const response = await axios.post(apiUrl, {
          messages: [
            {
              role: "user",
              content: promptMessage,
            },
          ],
          model: apiModel,
        });
        setOutput(response.data);
      } catch {
        setErrorMessages(["Failed to fetch data. Please try again."]);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="mx-[5%] text-gray-200 flex flex-col items-center gap-2 pt-7">
      <div className="input-area font-bold text-2xl">
        <span>Write Here</span>
      </div>
      <ErrorAlert errorMessages={errorMessages} />
      <TopicInput topicName={topicName} setTopicName={setTopicName} />
      <div className="buttons-all flex gap-2 ">
        <CategorySelect
          categoryName={categoryName}
          setCategoryName={setCategoryName}
        />
        <LevelSelect levelName={levelName} setLevelName={setLevelName} />
      </div>
      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? <Spin /> : "Find"}
      </Button>
      <OutputDisplay
        output={output}
        categoryName={categoryName}
        topicName={topicName}
        handleCopy={handleCopy}
        handleDownloadPDF={handleDownloadPDF}
      />
    </div>
  );
};

export default WriteHere;
