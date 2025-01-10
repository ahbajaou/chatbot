import React from 'react';

const MessageList = ({ messages }) => {
  return (
    <div>
      {messages.map((message) => (
        <div
          key={message.id}
          className="p-2 mb-2 bg-blue-500 text-white rounded-lg shadow-md">
          {message.text}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
