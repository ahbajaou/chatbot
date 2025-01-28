// import React from 'react';
// import ChatBox from './components/ChatBox';
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { IoArrowBackCircle } from "react-icons/io5";

import { GoogleGenerativeAI } from "@google/generative-ai";

import MyLogo from './assets/myapplogo1.png'
import { Helmet } from 'react-helmet';
//  import ''

import './App.css';


const genAI = new GoogleGenerativeAI("AIzaSyDD56rQG--mtY8kLabEo-usxWNRj7Ijflk");

let conversationHistory = "";  // Store the conversation history

const generateAIResponse = async (userInput, userLevel = "Beginner") => {
  try {
    // Initialize the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Teaching context with modularity
    const teachingContext = `
      You are a skilled English teacher. Your job is to:
      1. Correct grammar mistakes.
      2. Explain difficult concepts clearly.
      3. Introduce new vocabulary with examples.
      4. Answer questions patiently and encourage interaction.
      Tailor your response based on the user's level: Beginner, Intermediate, or Advanced.
    `;

    // Adjust tone or difficulty dynamically
    const toneAdjustment = userLevel === "Beginner"
      ? "Use simple sentences and provide step-by-step explanations."
      : userLevel === "Intermediate"
      ? "Provide more nuanced details and intermediate vocabulary."
      : "Use advanced terms and assume a higher level of understanding.";

    // Combine the teacher prompt with the user's input and previous conversation
    const completePrompt = `
      ${teachingContext}
      Level: ${userLevel}
      Additional Notes: ${toneAdjustment}
      Conversation History: ${conversationHistory}
      User: ${userInput}
    `;

    // Generate content
    const result = await model.generateContent(completePrompt);
    const generatedText = result.response; // Adjust based on actual response structure

    // Update conversation history
    conversationHistory += `User: ${userInput}\nAI: ${generatedText}\n`;

    return generatedText;
  } catch (error) {
    console.error("Error generating content:", error);
    return "I'm sorry, I couldn't process that. Please try again.";
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
    console.log("----------------> :" + aiResponse)
    // const aiResponse = JSON.parse(aiResponse);

// Navigate through the object to extract the desired text
// if (aiResponse.candidates[0].content.parts[0].text){
  const extractedText = aiResponse.candidates[0].content.parts[0].text;
  const newBotMessage = { text: extractedText, sender: 'bot' };
  setMessages((prevMessages) => [...prevMessages, newBotMessage]);
// }
    // const sanitizedResponse = typeof extractedText === 'string' ? extractedText : JSON.stringify(extractedText);
    
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
        <div className="bg-white  overflow-hidden">
          <div className="p-4 bg-gray-100 text-white overflow-hidden">
            <div className="h-14 rounded-lg p-2 flex justify-between items-center" style={{background: 'rgba(37, 146, 253, 1)'}}>
                <IoArrowBackCircle onClick={backtoStart} className="text-white text-3xl hover:text-gray-900 transition-transform duration-300 transform hover:scale-110"/>
                <span className="text-lg text-white font-bold">LingoPal</span>
                <div className="w-8 "></div>
            </div>
          </div>
          
          <div className="h-[30rem] bg-gray-100 overflow-y-auto p-4 flex flex-col">
          {messages.map((msg, index) => (
              <div key={index} className="mb-2 flex items-start gap-2">
                    {msg.sender === 'bot' && (
                        <div className="w-8 h-8 rounded-full bg-blue-500 shadow-md flex items-center justify-center">
                          <img
                            src={MyLogo}
                            alt="Bot logo"
                            className="w-6 h-6 rounded-full object-cover"
                          />
                        </div>
                    )}
                    <div
                      className={`p-2 rounded-lg max-w-[80%] ${
                        msg.sender === 'user'
                          ? 'bg-blue-500 text-white ml-auto'
                          : 'bg-gray-200 text-black mr-auto'
                      }`}
                    >
                      <span>{msg.text}</span>
                    </div>
                </div>
                ))}
              {isTyping && (
                <div className="mb-2 p-2  rounded-lg max-w-[80%] bg-white text-black mr-auto">
                  <TypingIndicator />
                </div>
              )}
          </div>
          <div className="p-4 border-t flex bg-gray-100">
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
              className=" text-white p-2 rounded-r-lg"
              style={{background: 'rgba(37, 146, 253, 1)'}}
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
              style={{ width: "200px" }}
              className='mb-20'
              />
              <h1 className='text-5xl text-center' style={{color:'rgba(0, 0, 0, 0.58)'}}>                
                Welcom to <span className='font-jua' style={{color:"rgba(229, 135, 49, 1)"}}>LingoPal</span>
              </h1>
              <p className='mt-2' style={{color:'rgba(0, 0, 0, 0.58)'}}>
                Learn English, one chat at a time.
              </p>
            <button style={{background: 'rgba(37, 146, 253, 1)'}} onClick={handleSkep} class="w-40 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10">Start</button>
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


