import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './SupportChat.css';
import { jwtDecode } from 'jwt-decode';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa'; // Import the FaVolumeUp and FaVolumeMute icons

const SupportChat = () => {
  const [userInput, setUserInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [botResponsesQueue, setBotResponsesQueue] = useState([]); // Queue for bot responses
  const [speechEnabled, setSpeechEnabled] = useState(false); // Default state of TTS is disabled
  const chatContentRef = useRef(null);
  const decodedToken = jwtDecode(localStorage.getItem('token'));

  useEffect(() => {
    // Scroll to bottom when chatMessages change
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Text-to-speech effect triggered whenever there's a new bot response and TTS is enabled
  useEffect(() => {
    if (speechEnabled && botResponsesQueue.length > 0) {
      const [response] = botResponsesQueue; // Get the first response in the queue
      const speech = new SpeechSynthesisUtterance(response);
      speech.lang = 'en-US'; // Set language to English (United States)
      speech.onend = () => {
        // Remove the spoken response from the queue after it's spoken
        setBotResponsesQueue(prevQueue => prevQueue.slice(1));
      };
      window.speechSynthesis.speak(speech);
    }
  }, [botResponsesQueue, speechEnabled]);

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const toggleSpeech = () => {
    setSpeechEnabled(!speechEnabled);
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
            if (speechEnabled) {
              setBotResponsesQueue(prevQueue => [...prevQueue, productMessage]);
            }
          } else {
            const errorMessage = `Error: ${response.data.error}`;
            const newErrorMessage = { type: 'bot', content: errorMessage };
            setChatMessages(prevMessages => [...prevMessages, newErrorMessage]);
            if (speechEnabled) {
              setBotResponsesQueue(prevQueue => [...prevQueue, errorMessage]);
            }
          }
        }
      }
  
      // If user input is not for sending an email or product info, proceed with getting bot response
      if (!emailMatch && !productMatch) {
        const response = await axios.post('http://127.0.0.1:5000/generate_response', { user_input: userInput });
        const newBotMessage = { type: 'bot', content: response.data.response };
        setChatMessages(prevMessages => [...prevMessages, newBotMessage]);
        if (speechEnabled) {
          setBotResponsesQueue(prevQueue => [...prevQueue, response.data.response]);
        }
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
      <div>
        <div onClick={toggleSpeech} style={{ cursor: 'pointer' }}>
          {speechEnabled ? <FaVolumeUp /> : <FaVolumeMute />}
        </div>
      </div>
    </div>
  );
};

export default SupportChat;
