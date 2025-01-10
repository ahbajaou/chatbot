import React, { useState } from 'react';

const MessageInput = ({ onSendMessage }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() !== '') {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        placeholder="Type a message..."
        className="flex-grow p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
      />
      <button
        onClick={handleSend}
        className="ml-2 p-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
