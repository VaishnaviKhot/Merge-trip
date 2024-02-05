import React, { useState } from "react";
import "../Css/Help.css";

const ChatAssistant = () => {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (text, isUser = true) => {
    setMessages([...messages, { text, isUser }]);
    // Simulate a response from the chat assistant after a short delay
    setTimeout(() => {
      const assistantResponse = getAssistantResponse(text);
      setMessages([...messages, { text: assistantResponse, isUser: false }]);
    }, 500);
  };

  const getAssistantResponse = (userMessage) => {
    // You can customize the assistant's responses based on user input
    if (userMessage.toLowerCase().includes("hello")) {
      return "Hello! How can I assist you today?";
    } else {
      return "I'm sorry, I didn't understand that. Can you please clarify?";
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={message.isUser ? "user-message" : "assistant-message"}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSendMessage(e.target.value);
            }
          }}
        />
        <button
          onClick={() =>
            handleSendMessage(document.querySelector("input").value)
          }
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatAssistant;
