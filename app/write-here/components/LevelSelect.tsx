// src/components/LevelSelect.tsx
import React from "react";
import { Select } from "antd";

interface LevelSelectProps {
  levelName: string;
  setLevelName: (value: string) => void;
}

const LevelSelect: React.FC<LevelSelectProps> = ({
  levelName,
  setLevelName,
}) => {
  return (
    <Select
      onChange={setLevelName} 
      value={levelName || undefined}
      showSearch
      placeholder="Select a Mode"
      filterOption={(input, option) =>
        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
      }
      options={[
        { value: "Standard", label: "Standard" },
        { value: "Fluency", label: "Fluency" },
        { value: "Natural", label: "Natural" },
        { value: "Formal", label: "Formal" },
        { value: "Simple", label: "Simple" },
        { value: "Creative", label: "Creative" },
      ]}
    />
  );
};

export default LevelSelect;
