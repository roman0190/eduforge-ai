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
        const response = await axios.post(apiUrl, {
          messages: [
            {
              role: "user",
              content: `Write a ${categoryName} using ${levelName} Words on ${topicName} and follow study standard. Dont't use **,*. No title needed for "Paragraph, Essay, Story, Summary" ,Note:[if Paragraph: minimum 200-300 words and first give introduction based about the topic eg: what is it?,not more than 1pera; if Dialogue: minimum 200-300 words, Start with hi, hello, Good morning, afternoon, noon etc, add character name before sentence start eg. Roman:Hi, Musarof:Hello ,use different names ,must make 2 characters; if Report : Don't use first person eg.i,we,maximum 2para,use passive voice/inderect speech,maximum 120-150 words,must add heading-Staff/Reporter/Name,Place,Date like application; if Essay: minimum 600 word; if Application: must be formal and zip code not needed, start from Date; if Email: maximum 200-400 words; if Summary: maximum 100-200 word; if Story:must minmum 400words; if Notice : left top No.ABC/1110/Year,top right in the same line of No. write Date eg . Date month year,main part of notice ,then Name than position eg.Roman Howladar Headmaster; ] . Follow Bangladesh Writing Standard. Don't write any extra word like - Certainly! Here’s an essay composed according to the specified guidelines.`,
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
