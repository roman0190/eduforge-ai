// src/components/TopicInput.tsx
import React from "react";
import { Input, Typography } from "antd";

const { TextArea } = Input;
const { Text } = Typography;

interface TopicInputProps {
  topicName: string;
  setTopicName: (value: string) => void;
}

const TopicInput: React.FC<TopicInputProps> = ({ topicName, setTopicName }) => {
  return (
    <div className="w-full space-y-2">
      <Text className="text-gray-700 font-medium text-base">Topic *</Text>
      <TextArea
        value={topicName}
        onChange={(e) => setTopicName(e.target.value)}
        placeholder="Enter your topic here... (e.g., Climate Change, Digital Bangladesh, etc.)"
        autoSize={{ minRows: 3, maxRows: 6 }}
        className="!text-base"
        showCount
        maxLength={200}
      />
      {topicName.length > 0 && (
        <Text className="text-green-600 text-sm">
          ✓ Topic entered successfully
        </Text>
      )}
    </div>
  );
};

export default TopicInput;
