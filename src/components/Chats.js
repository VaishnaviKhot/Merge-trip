import React, { useState } from 'react';
import '../Css/Chats.css'; // Import the CSS file for styling

const ChatPage = () => {
  const [inputText, setInputText] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim() !== '') {
      setChatHistory([...chatHistory, inputText]);
      setInputText('');
    }
  };

  return (
    <div className="chats-container">
      <div className="chat-history">
        {chatHistory.map((message, index) => (
          <div key={index} className="chat-message">
            {message}
          </div>
        ))}
      </div>
      <form onSubmit={handleFormSubmit} className="chat-form">
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="chat-input"
        />
        <button type="submit" className="chat-submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ChatPage;
