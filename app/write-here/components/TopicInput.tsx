// src/components/TopicInput.tsx
import React from "react";
import { Input } from "antd";

const { TextArea } = Input;

interface TopicInputProps {
  topicName: string;
  setTopicName: (value: string) => void;
}

const TopicInput: React.FC<TopicInputProps> = ({ topicName, setTopicName }) => {
  return (
    <div className="md:max-w-[600px] w-full">
      <TextArea
        value={topicName}
        onChange={(e) => setTopicName(e.target.value)}
        placeholder="Write the topic name..."
        autoSize
      />
    </div>
  );
};

export default TopicInput;
