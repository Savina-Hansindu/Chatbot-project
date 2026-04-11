import dayjs from 'dayjs';
import { useState } from 'react'
import LoadingSpinnerImage from '../assets/loading-spinner.gif'
import { Chatbot } from 'supersimpledev'
import './ChatInput.css'

export function ChatInput({ chatMessages,setChatMessages }) {
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    function saveInputText(event) {
      setInputText(event.target.value);
    }

    async function sendMessage() {
      if(isLoading || inputText === ''){
        return;
      }
      setIsLoading(true);
      setInputText('');

      const newChatMessages = [
        ...chatMessages,
        {
          message: inputText,
          sender: 'user',
          id: crypto.randomUUID(),
          time: dayjs().valueOf()
        }
      ]


      setChatMessages([
        ...newChatMessages,
        {
          message: <img src={LoadingSpinnerImage} className='loading-spinner-image' />,
          sender: 'robot',
          id: crypto.randomUUID(),
          time: dayjs().valueOf()
        }
      ])
      
      const response = await Chatbot.getResponseAsync(inputText);
      setChatMessages([
        ...newChatMessages,
        {
          message: response,
          sender: 'robot',
          id: crypto.randomUUID(),
          time: dayjs().valueOf()
        }
      ]);

      setIsLoading(false);

    }

    function clearMessages() {
      setChatMessages([]);
    }

    function pressingKeys(event) {
      if(event.key === 'Enter') { sendMessage() }
      if(event.key === 'Escape') { setInputText('') }
    }

    return (
      <div className='chat-input-container'>
        <input 
          placeholder="Send a message to Chatbot" 
          size="30" 
          onChange= {saveInputText}
          value={inputText}
          onKeyDown={pressingKeys}
          className='chat-input'
        />
        <button
            className='send-message'
            onClick={sendMessage}>
            Send
        </button>
        <button
          onClick={clearMessages}
          className="clear-button">
            Clear
        </button>
      </div>
    );
}

