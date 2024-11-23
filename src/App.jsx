import React from 'react';
import { useState } from 'react';
import './App.css';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer , ChatContainer , MessageList , Message, MessageInput , TypingIndicator} from '@chatscope/chat-ui-kit-react';

const API_KEY  = "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";

function App() {
  const [messages , setMessage] = useState([
    {
      message: "Hello, i am ChatGPT!",
      sender:"ChatGPT"
    }
  ])
  const [typing , setTyping] = useState(false);
  const handelSend = async (message) => {
      const newMessage = {
        message : message,
        sender : 'user',
        direction : "outgoing"
      }
      const newMessages = [...message, newMessage];
      setMessage(newMessages);
      // useState(true);
      setTyping(true);
      console.log(newMessages);
      await processMessageTochatGPT(newMessages);

    }
  async function processMessageTochatGPT(chatMessage){
      let apiMessage = chatMessage.map((messageObject) => {
        let role;
        if (messageObject.sender === "ChatGTP"){
          role="assistant"
        }else{
          role = "user"
        }
        return {role: role, content: messageObject.message}
      });
      const systemMessage = {
        role : "system",
        content : "Yo, this is ChatterBot! How can I help you today?",
      }
      const apiRequestBody = {
        "model" : "gpt-3.5-turbo",
        "messages" : [
          systemMessage,
          ...apiMessage
        ]
      }
      await fetch("https://api.openai.com/v1/chat/completions",{
          method : "POST",
          headers : {
            "Authorization" : "Bearer " + API_KEY,
            "Content-Type" : "application/json"
          },
          body : JSON.stringify(apiRequestBody)
      }).then((data) => {
        return data.json();
      }).then((data) => {
        console.log(data);
      })
  }
  return (
    <div className="App">
      <div style={{position: "relative" , height :"100dvh" , width :"100dvw"}}>
        <MainContainer className=''>
          <ChatContainer>
            <MessageList
              typingIndicator={typing ? <TypingIndicator content="ChatGTP is typing" /> : null} 
              >
              {messages.map((message,i) => {
                return <Message key={i} model={message} />
              })}
            </MessageList>
            <MessageInput placeholder='Type message here' onSend={handelSend}/>
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}

export default App;
 