import { useRef,useEffect } from 'react'
import { ChatMessage } from './ChatMessage';
import './ChatMessages.css'

export function ChatMessages({ chatMessages }){
    function useAutoScroll(dependencies) {
      const containerRef = useRef(null);
      
      useEffect(() => {
        const containerElm = containerRef.current
        if(containerElm) {
          containerElm.scrollTop = containerElm.scrollHeight;
        }
      },dependencies);
      return containerRef;
    }
  
    const chatMessagesRef = useAutoScroll([chatMessages.length]);

    return (
      <div className='chat-messages-container' ref={chatMessagesRef}>
        {chatMessages.map((chatMessage) => (
          <ChatMessage
            message={chatMessage.message} 
            sender={chatMessage.sender}
            time = {chatMessage.time}
            key={chatMessage.id}
          />
        ))}
      </div>
    );
  }