import React from "react";
import { Select } from "antd";

interface CategorySelectProps {
  categoryName: string;
  setCategoryName: (value: string) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({
  categoryName,
  setCategoryName,
}) => {
  return (
    <Select
      onChange={setCategoryName}
      showSearch
      value={categoryName || undefined}
      placeholder="Select a Category"
      filterOption={(input, option) =>
        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
      }
      options={[
        { value: "Paragraph", label: "Paragraph" },
        { value: "Essay", label: "Essay" },
        { value: "Letter", label: "Letter" },
        { value: "Application", label: "Application" },
        { value: "Report", label: "Report" },
        { value: "Dialogue", label: "Dialogue" },
        { value: "Story", label: "Story" },
        { value: "Email", label: "Email" },
        { value: "Summary", label: "Summary" },
        { value: "Notice", label: "Notice" },
      ]}
      
    />
  );
};

export default CategorySelect;
