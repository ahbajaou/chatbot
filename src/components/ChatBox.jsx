import React from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const ChatBox = () => {
  const [messages, setMessages] = React.useState([]);

  const handleSendMessage = (message) => {
    setMessages([...messages, { id: Date.now(), text: message }]);
  };
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-grow overflow-y-auto p-4">
        <MessageList messages={messages} />
      </div>
      <div className="p-4 border-t bg-white">
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatBox;
