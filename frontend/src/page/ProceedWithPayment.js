import React, { useState } from 'react';
import { Button, Card, CardContent, Container, Divider, Typography, Box, TextField, Grid } from '@mui/material';

const ProceedWithPayment = ({ onPaymentSuccess, userId, products }) => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const calculateTotal = () => {
    return products.reduce((total, product) => {
      const productPrice = product.price || 0;
      const productQuantity = product.quantity || 1;
      return total + productPrice * productQuantity;
    }, 0);
  };

  const handlePayment = async () => {
    const orderData = {
      UserId: userId,
      User: {},
      Products: products.map(product => ({
        ProductId: product.id,
        Quantity: product.quantity,
        Product: {}
      })),
      TotalPrice: calculateTotal(),
      OrderStatus: 'pending',
      Address: address,
      OrderDate: new Date().toISOString(),
      City: city,
      PhoneNumber: phoneNumber,
      ZipCode: zipCode
    };
  
    console.log('Order data:', orderData);
  
    try {
      const response = await fetch('http://localhost:5098/api/Order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });
  
      const responseData = await response.json();
  
      console.log('Payment response:', responseData);
  
      onPaymentSuccess();
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  

  return (
    <Container>
      <Card>
        <CardContent>
          <Box textAlign="center" p={3}>
            <Typography variant="h5">Proceed with Payment</Typography>
            <Divider style={{ margin: '12px 0' }} />
            <Typography variant="subtitle1">Your total amount: ${calculateTotal().toFixed(2)}</Typography>
            <Divider style={{ margin: '12px 0' }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Address"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="City"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  label="ZIP Code"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Grid>
            </Grid>
            <Divider style={{ margin: '12px 0' }} />
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
