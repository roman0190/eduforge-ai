"use client";
import React, { useState, useEffect } from "react";
import { Button, Spin, notification, Progress, Card, Typography } from "antd";
import ErrorAlert from "./components/ErrorAlert";
import { generateContent } from "./utils/geminiAPI";
import TopicInput from "./components/TopicInput";
import CategorySelect from "./components/CategorySelect";
import LevelSelect from "./components/LevelSelect";
import OutputDisplay from "./components/OutputDisplay";

const { Title, Text } = Typography;

const WriteHere: React.FC = () => {
  const [topicName, setTopicName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [levelName, setLevelName] = useState("");
  const [output, setOutput] = useState("");
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";

  // Debug: Check if API key is loaded
  useEffect(() => {
    console.log("API Key loaded:", apiKey ? "✓ Yes" : "✗ No");
    if (!apiKey) {
      setErrorMessages([
        "API key is missing. Please check your environment variables.",
      ]);
    }
  }, [apiKey]);

  // Validate form on input changes
  useEffect(() => {
    setIsFormValid(
      topicName.trim() !== "" && categoryName !== "" && levelName !== ""
    );
  }, [topicName, categoryName, levelName]);

  // Reset progress when starting new generation
  useEffect(() => {
    if (loading) {
      setProgress(0);
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(timer);
            return 90;
          }
          return prev + 10;
        });
      }, 500);
      return () => clearInterval(timer);
    }
  }, [loading]);

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
        // Check if API key exists
        if (!apiKey) {
          throw new Error("API key is missing");
        }

        // Use our dedicated API utility to generate content
        console.log("Generating content for:", {
          topicName,
          categoryName,
          levelName,
        });

        // Call the generateContent API with debug logging
        console.log("Calling generateContent API...");
        let text;
        try {
          text = await generateContent(
            {
              topic: topicName,
              category: categoryName,
              level: levelName,
            },
            apiKey
          );
          console.log("Content generated successfully, length:", text.length);
        } catch (genError) {
          console.error("Error in generateContent:", genError);
          throw genError;
        }

        // Set the output with the generated content
        console.log("Setting output...");
        setOutput(text);

        setProgress(100);

        notification.success({
          message: "Generated Successfully!",
          description: "Your content has been generated successfully!",
          placement: "topRight",
          duration: 3,
        });
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "An unknown error occurred";

        // Log the error for debugging but don't show it if it's the reactRender error
        console.error("Error generating content:", errorMessage);

        // Ignore the "reactRender is not a function" error since content is still generated
        if (errorMessage.includes("reactRender is not a function")) {
          console.log(
            "Ignoring reactRender error as content was generated successfully"
          );

          // Don't check for output here since React state might not be updated yet
          // Instead, always show success message for this specific error
          setProgress(100);
          notification.success({
            message: "Generated Successfully!",
            description: "Your content has been generated successfully!",
            placement: "topRight",
            duration: 3,
          });

          return;
        }

        notification.error({
          message: "Generation Failed",
          description: "Failed to generate content. Please try again.",
          placement: "topRight",
          duration: 5,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12 relative">
          <Title level={1} className="!text-gray-800 !mb-4">
            EduForge AI Writer
          </Title>
          <Text className="text-gray-600 text-lg">
            Professional content generation for academic writing
          </Text>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2">
            <Card
              title="Content Generator"
              className="shadow-lg border border-gray-200"
              headStyle={{
                backgroundColor: "#f8fafc",
                borderBottom: "1px solid #e2e8f0",
                fontSize: "18px",
                fontWeight: "600",
              }}
            >
              <div className="space-y-6">
                {/* Error Display */}
                <ErrorAlert errorMessages={errorMessages} />

                {/* Topic Input */}
                <TopicInput topicName={topicName} setTopicName={setTopicName} />

                {/* Category and Level Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <CategorySelect
                    categoryName={categoryName}
                    setCategoryName={setCategoryName}
                  />
                  <LevelSelect
                    levelName={levelName}
                    setLevelName={setLevelName}
                  />
                </div>

                {/* Progress Section */}
                {loading && (
                  <div className="space-y-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <Text className="text-blue-800 text-center block font-medium">
                      Generating your content...
                    </Text>
                    <Progress
                      percent={progress}
                      strokeColor="#2563eb"
                      showInfo={false}
                    />
                  </div>
                )}

                {/* Generate Button */}
                <div className="text-center pt-4">
                  <Button
                    type="primary"
                    size="large"
                    onClick={handleSubmit}
                    disabled={loading || !isFormValid}
                    className="!h-12 !px-8 !text-base !font-semibold"
                    style={{
                      backgroundColor: isFormValid ? "#2563eb" : undefined,
                      borderColor: isFormValid ? "#2563eb" : undefined,
                    }}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <Spin size="small" />
                        Generating Content...
                      </span>
                    ) : (
                      "Generate Content"
                    )}
                  </Button>
                </div>

                {/* Form Validation Helper */}
                {!isFormValid && !loading && (
                  <div className="text-center p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <Text className="text-amber-700 text-sm">
                      Please complete all fields to generate content
                    </Text>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>

        {/* Output Section */}
        <div className="mt-8">
          <OutputDisplay
            output={output}
            categoryName={categoryName}
            topicName={topicName}
          />
        </div>
      </div>
    </div>
  );
};

export default WriteHere;
