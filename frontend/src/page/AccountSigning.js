import React from 'react';
import SignIn from './SignIn'; 
import SignUp from './SignUp'; 
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

const AuthenticationPage = ({setToken}) => {
  return (
    <Box display="flex" flexDirection="row" alignItems="center">
      <SignIn setToken={setToken}/>
      <Divider orientation="vertical" flexItem />
      <SignUp/>
    </Box>
  );
};

export default AuthenticationPage;
