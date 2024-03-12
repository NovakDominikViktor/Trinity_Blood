import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './SupportChat.css';
import { jwtDecode } from 'jwt-decode';

const SupportChat = () => {
  const [userInput, setUserInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [botResponse, setBotResponse] = useState('');
  const chatContentRef = useRef(null);
  const decodedToken = jwtDecode(localStorage.getItem('token'));

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
    let emailMatch = null;
    let productMatch = null;
    try {
      setIsTyping(true);
      if (userInput.trim() !== '') {
        const newUserMessage = { type: 'user', content: userInput };
        setChatMessages(prevMessages => [...prevMessages, newUserMessage]);
  
        // Check if user input matches the pattern for sending an email
        const sendEmailPattern = /^send email: (.+)$/i;
        const productInfoPattern = /^what do you know about (.+)$/i;
        emailMatch = userInput.match(sendEmailPattern);
        productMatch = userInput.match(productInfoPattern);
  
        if (emailMatch) {
          const emailContent = emailMatch[1]; // Extract the message from the input
          const emailData = {
            recipientEmail: 'nagysohajok@kkszki.hu',
            subject: `${decodedToken.name} want help.`,
            content: `I was not able to help to ${decodedToken.name}\n so they sent the following
            message: ${emailContent}\n\nDate: ${new Date().toLocaleDateString()}`,
          };
          await axios.post('http://localhost:5098/api/Email', emailData);
        } else if (productMatch) {
          const productName = productMatch[1]; // Extract the product name from the input
          const response = await axios.post('http://127.0.0.1:5000/get_product_info', { product_name: productName });
          if (!response.data.error) {
            const { price, in_stock } = response.data;
            const productMessage = `Price: ${price}, In stock: ${in_stock ? 'Yes' : 'No'}`;
            const newProductMessage = { type: 'bot', content: productMessage };
            setChatMessages(prevMessages => [...prevMessages, newProductMessage]);
          } else {
            const errorMessage = `Error: ${response.data.error}`;
            const newErrorMessage = { type: 'bot', content: errorMessage };
            setChatMessages(prevMessages => [...prevMessages, newErrorMessage]);
          }
        }
      }
  
      // If user input is not for sending an email or product info, proceed with getting bot response
      if (!emailMatch && !productMatch) {
        const response = await axios.post('http://127.0.0.1:5000/generate_response', { user_input: userInput });
        setBotResponse(response.data.response);
        const newBotMessage = { type: 'bot', content: response.data.response };
        setChatMessages(prevMessages => [...prevMessages, newBotMessage]);
      }
  
      setUserInput('');
    } catch (error) {
      console.error('Error handling user input:', error);
    } finally {
      setIsTyping(false);
    }
  };
  
  return (
    <div className="support-chat-container">
      <div className="chat-header">
        Chat with Support
      </div>
      <div className="support-chat-content" ref={chatContentRef}>
        <div className="messages">
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
      <form onSubmit={handleSubmit} className="input-form">
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
  );
};

export default SupportChat;
