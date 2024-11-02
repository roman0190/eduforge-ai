// src/components/ErrorAlert.tsx
import React from "react";
import { Alert } from "antd";

interface ErrorAlertProps {
  errorMessages: string[];
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ errorMessages }) => {
  return errorMessages.length > 0 ? (
    <Alert
      message="Fill-up"
      description={
        <ul>
          {errorMessages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      }
      type="error"
      showIcon
      style={{ marginBottom: "16px", width: "100%" }}
    />
  ) : null;
};

export default ErrorAlert;
