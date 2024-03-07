import React, { useState } from 'react';
import { Button, Card, CardContent, Container, Divider, Typography, Box, TextField, Grid, Modal } from '@mui/material';
import {jwtDecode} from 'jwt-decode';

const ProceedWithPayment = ({ onPaymentSuccess, userId, products }) => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false); // Állapot a bejelentkezési modális ablak megjelenítéséhez

  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const userEmail = decodedToken.email;

  const calculateTotal = () => {
    return products.reduce((total, product) => {
      const productPrice = product.price || 0;
      const productQuantity = product.quantity || 1;
      return total + productPrice * productQuantity;
    }, 0);
  };

  const emailDataObject = {
    recipientEmail: userEmail,
    subject: 'Payment Confirmation',
    products: products.map(product => ({
      name: product.name,
      price: product.price,
      quantity: product.quantity
    })),
    address: address,
    city: city,
    zipCode: zipCode,
    phoneNumber: phoneNumber,
    totalPrice: calculateTotal()
  };

  const handlePayment = async () => {
    try {
      if (!userId) {
        // Ha nincs token, megjelenítjük a bejelentkezési modális ablakot
        setShowLoginModal(true);
        return;
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

        const response = await fetch('http://localhost:5098/api/Order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Token hozzáadása a kérés fejlécéhez
          },
          body: JSON.stringify(orderData)
        });

        const responseData = await response.json();

        console.log('Payment response:', responseData);
      }

      // Email küldése
      const emailContent = `Thank you, ${decodedToken.name}, for your purchase!\n\nYour total amount: $${emailDataObject.totalPrice.toFixed(2)}\n\nDate: ${new Date().toLocaleDateString()}\n\nProducts:\n${emailDataObject.products.map(product => `${product.name} - Quantity: ${product.quantity}, Price: $${product.price}`).join('\n')}\n\nAddress: ${emailDataObject.address}\nCity: ${emailDataObject.city}\nZIP Code: ${emailDataObject.zipCode}\nPhone Number: ${emailDataObject.phoneNumber}`;

      const emailData = {
        recipientEmail: userEmail,
        subject: 'Payment Confirmation',
        content: emailContent
      };

      console.log('Email data:', emailData);

      const emailResponse = await fetch('http://localhost:5098/api/Email', {
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

  // Bejelentkezési ablak bezárása
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
      {/* Bejelentkezési modális ablak */}
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
