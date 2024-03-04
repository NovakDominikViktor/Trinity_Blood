import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, Typography, Modal, Paper } from '@mui/material';

const SupportModal = ({ isOpen, onClose }) => {
  const [userInput, setUserInput] = useState('');
  const [botResponse, setBotResponse] = useState('');

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/generate_response', { user_input: userInput });
      // Ne adjuk vissza a saját üzenetet
      if (userInput.trim() !== '') {
        setBotResponse(response.data.response);
      }
      setUserInput('');
    } catch (error) {
      console.error('Error fetching response:', error);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Grid container justifyContent="center" style={{ marginTop: '50px' }}>
        <Grid item xs={8}>
          <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
            <Typography variant="h4" align="center" gutterBottom>Support Chat</Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                variant="outlined"
                label="Type here..."
                value={userInput}
                onChange={handleUserInput}
                style={{ marginBottom: '20px' }}
              />
              <Button variant="contained" color="primary" type="submit" fullWidth>Send</Button>
            </form>
            {botResponse && (
              <div style={{ marginTop: '20px' }}>
                <Typography variant="h6" align="center" gutterBottom>Bot Response:</Typography>
                <Typography variant="body1" align="center">{botResponse}</Typography>
              </div>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default SupportModal;
