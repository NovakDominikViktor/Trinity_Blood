import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './SupportChat.css';
import { jwtDecode } from 'jwt-decode';
import { FaMicrophoneAlt, FaMicrophoneAltSlash, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

const SupportChat = () => {
  const [userInput, setUserInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [botResponsesQueue, setBotResponsesQueue] = useState([]);
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const [speechToTextEnabled, setSpeechToTextEnabled] = useState(false);
  const chatContentRef = useRef(null);
  const formRef = useRef(null);
  const recognitionRef = useRef(null);

  const decodedToken = localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token')) : null;

  useEffect(() => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  }, [chatMessages]);

  useEffect(() => {
    if (speechEnabled && botResponsesQueue.length > 0) {
      const [response] = botResponsesQueue;
      const speech = new SpeechSynthesisUtterance(response);
      speech.lang = 'en-US';
      speech.onend = () => {
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

  const toggleSpeechToText = () => {
    if (speechToTextEnabled) {
      stopSpeechRecognition();
    } else {
      startSpeechRecognition();
    }
  };

  const startSpeechRecognition = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.onstart = () => {
      console.log('Speech recognition started');
      setSpeechToTextEnabled(true);
    };
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log('Speech recognized:', transcript);
      setUserInput(transcript);
      if (formRef.current) {
        formRef.current.dispatchEvent(new Event('submit', { cancelable: true }));
      }
    };
    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      // Handle error if needed
      setSpeechToTextEnabled(false); // Reset speechToTextEnabled if there's an error
    };
    recognition.onend = () => {
      console.log('Speech recognition ended');
      setSpeechToTextEnabled(false); // Reset speechToTextEnabled when recognition ends
      const sendButton = document.querySelector('.send-button');
      if (sendButton) {
        sendButton.click();
      }
    };
    recognition.start();
    recognitionRef.current = recognition;
  };
  
  const stopSpeechRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.abort();
      setSpeechToTextEnabled(false); // Reset speechToTextEnabled when recognition is manually stopped
    }
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
  
        const sendEmailPattern = /^send email: (.+)$/i;
        const productInfoPattern = /^what do you know about (.+)$/i;
        emailMatch = userInput.match(sendEmailPattern);
        productMatch = userInput.match(productInfoPattern);
  
        if (decodedToken) {
          // User is logged in
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
            const productName = productMatch[1];
          const response = await axios.post('http://127.0.0.1:5000/get_product_info', { product_name: productName });
          if (!response.data.error && response.data.options.length > 0){
            const options = response.data.options;
            const optionsMessage = `Found ${options.length} matching products. Please choose one: ${options.map((option, index) => `${index + 1}. ${option.name}`).join(', ')}`;
            const newOptionsMessage = { type: 'bot', content: optionsMessage, options };
            setChatMessages(prevMessages => [...prevMessages, newOptionsMessage]);
          }else{
            const errorMessage = `Error: ${response.data.error || 'No matching products found'}`;
            const newErrorMessage = { type: 'bot', content: errorMessage };
            setChatMessages(prevMessages => [...prevMessages, newErrorMessage]);
          }
          } else if (userInput.startsWith('i choose ')) {
            const optionIndex = parseInt(userInput.substring(9)); // Extract the number after "i choose "
            if (!isNaN(optionIndex) && optionIndex > 0 && optionIndex <= chatMessages[chatMessages.length - 1].options.length){
                const selectedOption = chatMessages[chatMessages.length - 1].options[optionIndex - 1];
                const response = await axios.post('http://127.0.0.1:5000/get_selected_product_info', { selected_product_name: selectedOption.name });
                const { price, in_stock } = response.data;
                const productMessage = `Name: ${selectedOption.name}, Price: ${price}, In stock: ${in_stock ? 'Yes' : 'No'}`;
                const newProductMessage = { type: 'bot', content: productMessage };
                setChatMessages(prevMessages => [...prevMessages, newProductMessage]);
            }
          } else {
            // Generate bot response
            const response = await axios.post('http://127.0.0.1:5000/generate_response', { user_input: userInput });
            const newBotMessage = { type: 'bot', content: response.data.response };
            setChatMessages(prevMessages => [...prevMessages, newBotMessage]);
            if (speechEnabled) {
              setBotResponsesQueue(prevQueue => [...prevQueue, response.data.response]);
            }
          }
        } else {
          // User is not logged in
          const notLoggedInMessage = "You're not logged in. Please log in to use this feature.";
          const newBotMessage = { type: 'bot', content: notLoggedInMessage };
          setChatMessages(prevMessages => [...prevMessages, newBotMessage]);
          if (speechEnabled) {
            setBotResponsesQueue(prevQueue => [...prevQueue, notLoggedInMessage]);
          }
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
      <form ref={formRef} onSubmit={handleSubmit} className="input-form">
        <input
          className="input-field ehh"
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
        <div onClick={toggleSpeechToText} style={{ cursor: 'pointer' }}>
          {speechToTextEnabled ? <FaMicrophoneAlt /> : <FaMicrophoneAltSlash />}
        </div>
      </div>
    </div>
  );
};

export default SupportChat;