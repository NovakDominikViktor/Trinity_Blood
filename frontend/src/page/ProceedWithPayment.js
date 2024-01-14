import React, { useState } from 'react';
import { Button, Card, CardContent, Container, Divider, Typography, Box, TextField } from '@mui/material';

const ProceedWithPayment = ({ onPaymentSuccess }) => {
  const [address, setAddress] = useState('123 Main St');
  const [city, setCity] = useState('Anytown');
  const [state, setState] = useState('CA');
  const [zipCode, setZipCode] = useState('12345');
  const [phoneNumber, setPhoneNumber] = useState('555-555-5555');

  const handlePayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      // Callback to inform the parent component about successful payment
      onPaymentSuccess();
    }, 1500);
  };

  return (
    <Container>
      <Card>
        <CardContent>
          <Box textAlign="center" p={3}>
            <Typography variant="h5">Proceed with Payment</Typography>
            <Divider />
            <Typography variant="subtitle1">Your total amount: $50.99</Typography>
            <Divider />
            <TextField
              label="Address"
              variant="outlined"
              fullWidth
              margin="normal"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <TextField
              label="City"
              variant="outlined"
              fullWidth
              margin="normal"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <TextField
              label="State"
              variant="outlined"
              fullWidth
              margin="normal"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
            <TextField
              label="ZIP Code"
              variant="outlined"
              fullWidth
              margin="normal"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              margin="normal"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <Divider />
            <Button variant="contained" color="primary" onClick={handlePayment}>
              Pay Now
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProceedWithPayment;
