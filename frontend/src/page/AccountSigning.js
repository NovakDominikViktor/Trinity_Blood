import React from 'react';
import SignIn from './SignIn'; 
import SignUp from './SignUp'; 
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

const AuthenticationPage = () => {
  return (
    <Box display="flex" flexDirection="row" alignItems="center">
      <SignIn/>
      <Divider orientation="vertical" flexItem />
      <SignUp/>
    </Box>
  );
};

export default AuthenticationPage;
