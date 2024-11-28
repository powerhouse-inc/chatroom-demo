/* eslint-disable react/jsx-no-bind */
import { useState } from "react";
import { SendIcon } from "./SendIcon";

export interface TextInputProps {
  onSendMessage: (message: string) => void;
}

export const TextInput: React.FC<TextInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const onSubmit = () => {
    onSendMessage(message);
    setMessage("");
  };

  return (
    <div
      style={{
        backgroundColor: "#eeeef8",
        borderRadius: "8px",
        display: "flex",
        padding: "8px",
        paddingLeft: "16px",
        paddingRight: "16px",
        fontSize: "14px",
        gap: "8px",
      }}
    >
      <input
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.stopPropagation();
            e.preventDefault();
            onSubmit();
          }
        }}
        placeholder="Type a message..."
        style={{
          backgroundColor: "transparent",
          display: "flex",
          flex: 1,
          outline: "none",
        }}
        type="text"
        value={message}
      />
      <button
        onClick={onSubmit}
        style={{ color: "#434385", padding: "4px" }}
        type="button"
      >
        <SendIcon />
      </button>
    </div>
  );
};
