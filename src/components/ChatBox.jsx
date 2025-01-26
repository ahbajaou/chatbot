import React from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const ChatBox = () => {
  const [messages, setMessages] = React.useState([]);

  const handleSendMessage = (message) => {
    setMessages([...messages, { id: Date.now(), text: message }]);
  };
  return (
    <div className="flex flex-col h-screen m-5" style={{}}>
      <div style={{background:"rgba(217, 217, 217, 1)",borderRadius:"5px"}} className="h-14">
      </div>
      <div style={{height:"75%"}} className="">
      </div>
      <div style={{background:"rgba(217, 217, 217, 1)",borderRadius:"5px"}} className="h-14">
      </div>
    </div>
  );
};
 
export default ChatBox;
