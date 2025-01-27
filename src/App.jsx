// import React from 'react';
// import ChatBox from './components/ChatBox';
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { IoArrowBackCircle } from "react-icons/io5";

import { GoogleGenerativeAI } from "@google/generative-ai";

import MyLogo from './assets/myapplogo.png'
import { Helmet } from 'react-helmet';
//  import ''

import './App.css';


const genAI = new GoogleGenerativeAI("AIzaSyDD56rQG--mtY8kLabEo-usxWNRj7Ijflk");

const generateAIResponse = async (userInput) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(userInput);
    const generatedText = result.response; // Adjust based on actual response structure
    return generatedText;
  } catch (error) {
    console.error("Error generating content:", error);
    return "I'm sorry, I couldn't process that.";
  }
};

const TypingIndicator = () => (
  <div className="flex items-center">
    <span>Typing</span>
    <span className="dot-1">.</span>
    <span className="dot-2">.</span>
    <span className="dot-3">.</span>
  </div>
);

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
  
    const newUserMessage = { text: inputMessage, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
  
    setInputMessage('');
    setIsTyping(true);
  
    const aiResponse = await generateAIResponse(inputMessage);
    setIsTyping(false)
    console.log(aiResponse)
    // const aiResponse = JSON.parse(aiResponse);

// Navigate through the object to extract the desired text
    const extractedText = aiResponse.candidates[0].content.parts[0].text;
    // const sanitizedResponse = typeof extractedText === 'string' ? extractedText : JSON.stringify(extractedText);
    const newBotMessage = { text: extractedText, sender: 'bot' };
    setMessages((prevMessages) => [...prevMessages, newBotMessage]);
    
  };
  const backtoStart = () => {
    setIsLogin(false);

  }
  const handleSkep = () => {
    setIsLogin(true);
  }
  if (isLogin){
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-grow container mx-auto max-w-md p-4">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4 bg-white text-white">
            <div className="h-14 rounded-lg p-2 flex justify-between items-center" style={{background: 'rgba(217, 217, 217, 1)'}}>
                <IoArrowBackCircle onClick={backtoStart} className="text-blue-500 text-3xl hover:text-gray-900 transition-transform duration-300 transform hover:scale-110"/>
                <span className="text-lg text-gray-900 font-bold">LingoPal</span>
                <div className="w-8 "></div>
            </div>
          </div>
          
          <div className="h-96 overflow-y-auto p-4">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`mb-2 p-2 rounded-lg max-w-[80%] 
                  ${msg.sender === 'user' 
                    ? 'bg-blue-500 text-white ml-auto' 
                    : 'bg-gray-200 text-black mr-auto'}`}
              >
                {msg.text}
              </div>
            ))}
              {isTyping && (
                <div className="mb-2 p-2 rounded-lg max-w-[80%] bg-white text-black mr-auto">
                  <TypingIndicator />
                </div>
              )}
          </div>
          <div className="p-4 border-t flex">
            <input 
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message..."
              className="flex-grow p-2 border rounded-l-lg"
            />
            <button 
              onClick={handleSendMessage}
              className="bg-blue-500 text-white p-2 rounded-r-lg"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
    )
  }
  return (
    
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Helmet>
          <link href="https://fonts.googleapis.com/css2?family=Jua&display=swap" rel="stylesheet" />
      </Helmet>
        <div className="flex-grow container mx-auto max-w-md p-4" style={{background:"rgba(172, 222, 255, 1)"}}>
          <div className='flex flex-col items-center justify-center max-w-md'>
              <img
              src={MyLogo}
              alt=""
              style={{ width: "500px" }}
              className=''
              />
              <h1 className='text-5xl text-center'>                
                Welcom to <span className='font-jua' style={{color:"rgba(229, 135, 49, 1)"}}>LingoPal</span>
              </h1>
              <p className='mt-2'>
                Learn English, one chat at a time.
              </p>
            <button onClick={handleSkep} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10">Start</button>
            </div>
        </div>
    </div>
  );
};

// export default ChatApp;

const App = () => {
  return (
    <div className="App">
      <ChatApp/>
    </div>
  );
};

export default App;


