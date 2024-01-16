import React from 'react';
import { Typography, Container, Box, Link } from '@mui/material';

const Footer = () => {
  return (
    <footer>
      <Container maxWidth="md">
        <Box mt={5}>
          <Typography variant="h6" align="center" gutterBottom>
            Awesome Store
          </Typography>
          <Typography variant="subtitle1" align="center" color="text.secondary">
            Your one-stop destination for quality products.
          </Typography>
        </Box>
        <Box mt={3} textAlign="center">
          <Link color="inherit" href="#home">
            Home
          </Link>{' '}
          |{' '}
          <Link color="inherit" href="#products">
            Products
          </Link>{' '}
          |{' '}
          <Link color="inherit" href="#about">
            About Us
          </Link>{' '}
          |{' '}
          <Link color="inherit" href="#contact">
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
