import React from 'react';
import { Typography, Container, Box, Link } from '@mui/material';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#f8f9fa', padding: '20px 0' }}>
      <Container maxWidth="md">
        <Box mt={5}>
          <Typography variant="h6" align="center" gutterBottom style={{ color: '#007bff' }}>
            ScriptSyncShop
          </Typography>
          <Typography variant="subtitle1" align="center" color="text.secondary">
            Your one-stop destination for quality products.
          </Typography>
        </Box>
        <Box mt={3} textAlign="center">
          <Link color="inherit" href="/" style={{ margin: '0 10px', textDecoration: 'none', color: '#343a40' }}>
            Home
          </Link>{' '}
          |{' '}
          <Link color="inherit" href="/allproducts" style={{ margin: '0 10px', textDecoration: 'none', color: '#343a40' }}>
            Products
          </Link>{' '}
          |{' '}
          <Link color="inherit" href="/aboutus" style={{ margin: '0 10px', textDecoration: 'none', color: '#343a40' }}>
            About Us
          </Link>{' '}
          |{' '}
          <Link color="inherit" href="/contactus" style={{ margin: '0 10px', textDecoration: 'none', color: '#343a40' }}>
            Contact
          </Link>
        </Box>
        <Box mt={3} textAlign="center">
          <Typography variant="body2" color="text.secondary">
            &copy; {new Date().getFullYear()} Awesome Store. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </footer>
  );
};

export default Footer;
