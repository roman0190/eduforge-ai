// src/components/LevelSelect.tsx
import React from "react";
import { Select, Typography } from "antd";

const { Text } = Typography;

interface LevelSelectProps {
  levelName: string;
  setLevelName: (value: string) => void;
}

const LevelSelect: React.FC<LevelSelectProps> = ({
  levelName,
  setLevelName,
}) => {
  const levelOptions = [
    { value: "Standard", label: "Standard" },
    { value: "Fluency", label: "Fluency" },
    { value: "Natural", label: "Natural" },
    { value: "Formal", label: "Formal" },
    { value: "Simple", label: "Simple" },
    { value: "Creative", label: "Creative" },
  ];

  return (
    <div className="w-full space-y-2">
      <Text className="text-gray-700 font-medium text-base">
        Writing Mode *
      </Text>
      <Select
        onChange={setLevelName}
        value={levelName || undefined}
        showSearch
        placeholder="Choose writing style..."
        size="large"
        className="w-full"
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        options={levelOptions}
      />
      {levelName && (
        <Text className="text-green-600 text-sm">
          ✓ {levelName} mode selected
        </Text>
      )}
    </div>
  );
};

export default LevelSelect;
