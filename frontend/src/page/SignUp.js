import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, Grid, Box, Typography, Container } from '@mui/material';
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme();

const SignUp = () => {
  const [, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const formData = {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      email: event.target.email.value,
      password: event.target.password.value,
      confirmPassword: event.target.confirmPassword.value
    };
  
    if (formData.password !== formData.confirmPassword) {
      console.error('The two password must match!');
      toast.error('The two password must match!');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5098/api/Auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
    
      if (response.ok) {
        const responseBody = await response.text(); // Get the success message from the backend
        setMessage(responseBody); // Set the success message received from the backend
        toast.success(responseBody); // Display the success message using toastify
      } else {
        console.error('Registration failed:', response.statusText);
        const responseBody = await response.text(); // Get the error message from the backend
        const errorMessage = responseBody || 'There was an error during registration';
        console.error(errorMessage);
        setMessage(errorMessage);
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = 'There was an error during registration';
      setMessage(errorMessage);
      toast.error(errorMessage);
    }
  };
  

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '30px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
          <Avatar sx={{ m: 1, bgcolor: '#333' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ color: '#333', marginBottom: '20px' }}>
            Registration
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField autoComplete="given-name" name="firstName" required fullWidth id="firstName" label="First name" autoFocus />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField required fullWidth id="lastName" label="Last name" name="lastName" autoComplete="family-name" />
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth id="email-r" label="E-mail" name="email" autoComplete="email" />
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth name="password" label="Password" type="password" id="password-r" autoComplete="new-password" />
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth name="confirmPassword" label="Confirm password" id='confirmPassword' type="password" autoComplete="new-password" />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, backgroundColor: '#333', color: '#fff', '&:hover': { backgroundColor: '#555' } }}>
              Registration
            </Button>
          </Box>
        </Box>
      </Container>
      <ToastContainer /> {/* This is directly under the root component */}
    </ThemeProvider>
  );
}

export default SignUp;
