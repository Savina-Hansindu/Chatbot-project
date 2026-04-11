import { useState,useEffect } from 'react'
import { Chatbot } from 'supersimpledev'
import { ChatInput } from './components/ChatInput'; //.jsx
import { ChatMessages } from './components/ChatMessages';
import './App.css'

function App() {
  const [ chatMessages, setChatMessages ] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('messages'));
    return saved || [
      {message: 'Hello chatbot', sender: "user", id:'id1'},
      {message:"Hello! How can I help you?", sender:"robot", id:'id2'},
      {message:"Can you get me todays date?", sender:"user", id:'id3'},
      {message: "Today is March 16", sender: "robot", id:'id4'}
    ];
  });

  useEffect(() => {
      Chatbot.addResponses({
        'goodbye': 'Goodbye. Have a great day!',
        'give me a unique id': function() {
          return `Sure! Here's a unique ID: ${crypto.randomUUID()}`;
        }
      });
    }, [])

    useEffect(()=>{
      localStorage.setItem('messages',JSON.stringify(chatMessages))
    },[chatMessages])

      return (
        <div className='app-container'>  
        {chatMessages.length === 0 && (
          <p className='welcome-message'>
              Welcome to the chatbot project! Send a message using textbox below  
          </p>
        )}
      <ChatMessages
      chatMessages={chatMessages}
      />
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}


export default App;
