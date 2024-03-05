import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './SupportChat.css'; // Import CSS file for styling

const SupportChat = () => {
  const [userInput, setUserInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [botResponse, setBotResponse] = useState('');
  const chatContentRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom when chatMessages change
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsTyping(true);
      if (userInput.trim() !== '') {
        const newUserMessage = { type: 'user', content: userInput };
        setChatMessages(prevMessages => [...prevMessages, newUserMessage]);
      }
      const response = await axios.post('http://127.0.0.1:5000/generate_response', { user_input: userInput });
      setBotResponse(response.data.response);
      const newBotMessage = { type: 'bot', content: response.data.response };
      setChatMessages(prevMessages => [...prevMessages, newBotMessage]);
      setUserInput('');
    } catch (error) {
      console.error('Error fetching response:', error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div>
    <div className="chat-header">
      Írj a szupportnak (dani az)
    </div>
    <div className="support-chat-container">
      <div className="support-chat-content">
        <div ref={chatContentRef} className="messages" style={{ minHeight: '150px' }}>
          {chatMessages.map((message, index) => (
            <div key={index} className={`message ${message.type}`}>
              {message.type === 'user' ? (
                <div className="user-message"><span className="user-label">You:</span> {message.content}</div>
              ) : (
                <div className="bot-message">
                  <span className="bot-label">Bot:</span> {message.content}
                </div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="bot-typing">
              Bot is typing...
            </div>
          )}
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          className="input-field"
          type="text"
          placeholder="Type here..."
          value={userInput}
          onChange={handleUserInput}
        />
        <button className="send-button" type="submit">Send</button>
      </form>
    </div>
  </div>
  
  );
};

export default SupportChat;
