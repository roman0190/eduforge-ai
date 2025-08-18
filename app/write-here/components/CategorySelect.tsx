import React from "react";
import { Select, Typography } from "antd";

const { Text } = Typography;

interface CategorySelectProps {
  categoryName: string;
  setCategoryName: (value: string) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({
  categoryName,
  setCategoryName,
}) => {
  const categoryOptions = [
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
  ];

  return (
    <div className="w-full space-y-2">
      <Text className="text-gray-700 font-medium text-base">Category *</Text>
      <Select
        onChange={setCategoryName}
        showSearch
        value={categoryName || undefined}
        placeholder="Choose content type..."
        size="large"
        className="w-full"
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        options={categoryOptions}
      />
      {categoryName && (
        <Text className="text-green-600 text-sm">
          ✓ {categoryName} selected
        </Text>
      )}
    </div>
  );
};

export default CategorySelect;
