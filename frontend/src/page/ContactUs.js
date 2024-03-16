import React, { useState } from 'react';
import { Button, Container, TextField, Typography } from '@mui/material';
import axios from 'axios'; // Import axios for making HTTP requests

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Send a POST request to the API endpoint with the form data
      const response = await axios.post('http://localhost:5098/api/Email', {
        recipientEmail: 'nagysohajok@kkszki.hu', // Replace with recipient email
        subject: 'Contact Us Form Submission',
        content: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
      });

      // Log the response from the API
      console.log('Response from API:', response.data);
      
      // Optionally, you can display a success message to the user
      alert('Your message has been sent successfully!');

      // Reset the form fields after successful submission
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      // Handle any errors that occur during the API request
      console.error('Error sending message:', error);
      // Optionally, you can display an error message to the user
      alert('An error occurred while sending your message. Please try again later.');
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>
        Contact Us
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Your Name"
          variant="outlined"
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          fullWidth
          label="Your Email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Your Message"
          variant="outlined"
          margin="normal"
          multiline
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default ContactUs;
