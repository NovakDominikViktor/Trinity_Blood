import React, { useState } from 'react';
import { Button, Card, CardContent, Container, Divider, Typography, Box, TextField, Grid, Modal } from '@mui/material';
import {jwtDecode} from 'jwt-decode';

const ProceedWithPayment = ({ onPaymentSuccess, userId, products }) => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const token = localStorage.getItem('token');
  const decodedToken = token ? jwtDecode(token) : null;
  const userEmail = decodedToken ? decodedToken.email : null;

  const calculateTotal = () => {
    return products.reduce((total, product) => {
      const productPrice = product.price || 0;
      const productQuantity = product.quantity || 1;
      return total + productPrice * productQuantity;
    }, 0);
  };

  const handlePayment = async () => {
    try {
      if (!userId) {
        setShowLoginModal(true);
        return;
      }

      
      if (!address || !city || !zipCode || !phoneNumber) {
        setErrorMessage('Please fill in all required fields.');
        return;
      } else {
        setErrorMessage('');
      }

      for (const product of products) {
        const orderData = {
          UserId: userId,
          productId: product.id,
          address: address,
          quantity: product.quantity,
          city: city,
          zipCode: zipCode,
          phoneNumber: phoneNumber,
          orderDate: new Date().toISOString(),
          orderStatus: 'pending',
          totalPrice: product.price * product.quantity
        };

        console.log('Order data:', orderData);

        const response = await fetch(`http://localhost:5098/api/Product/${product.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        const productData = await response.json();

        let updatedStock = productData.storageStock - product.quantity;

        const isItInStock = updatedStock > 0;
        if (!isItInStock) {
          updatedStock = 0;
        }

        const stockUpdateResponse = await fetch(`http://localhost:5098/api/Product/${product.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ storageStock: updatedStock, isItInStock: isItInStock })
        });

        console.log('Stock update response:', stockUpdateResponse);

        if (stockUpdateResponse.ok) {
          const orderResponse = await fetch('http://localhost:5098/api/Order', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(orderData)
          });

          const responseData = await orderResponse.json();

          console.log('Payment response:', responseData);
        } else {
          console.error('Failed to update stock for product:', product.id);
        }
      }

      const emailContent = `Thank you, ${decodedToken.name}, for your purchase!\n\nYour total amount: $${calculateTotal().toFixed(2)}\n\nDate: ${new Date().toLocaleDateString()}\n\nProducts:\n${products.map(product => `${product.name} - Quantity: ${product.quantity}, Price: $${product.price}`).join('\n')}\n\nAddress: ${address}\nCity: ${city}\nZIP Code: ${zipCode}\nPhone Number: ${phoneNumber}`;

      const emailData = {
        recipientEmail: userEmail,
        subject: 'Payment Confirmation',
        content: emailContent
      };

      console.log('Email data:', emailData);

      const emailResponse = await fetch('http://localhost:5098/api/Email/sendemail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(emailData)
      });

      console.log('Email response:', emailResponse);

      onPaymentSuccess();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
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
                  required
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
                  required
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
                  required
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
                  required
                />
              </Grid>
            </Grid>
            <Typography variant="body2" color="error">
              {errorMessage}
            </Typography>
            <Divider style={{ margin: '12px 0' }} />
            <Button variant="contained" color="primary" onClick={handlePayment}>
              Pay Now
            </Button>
          </Box>
        </CardContent>
      </Card>
      <Modal open={showLoginModal} onClose={handleCloseLoginModal}>
        <Box sx={{ width: 300, bgcolor: 'background.paper', border: '2px solid #000', p: 2, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Please Log In
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            You need to log in to proceed with the payment.
          </Typography>
          <Button onClick={handleCloseLoginModal}>Close</Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default ProceedWithPayment;
