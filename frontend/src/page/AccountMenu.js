import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AccountMenu = ({ userProfile, setToken, setUserId }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleAccountClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAccountClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Token null-ra állítása
    setToken(null);
    if (setUserId) {
      setUserId(null);
    }
  
    // Törlés a localStorage-ból
    localStorage.removeItem('token');
  
    // Átirányítás a főoldalra (/)
    navigate('/');
  
    // Menü bezárása
    handleAccountClose();
  };

  const handleAccountSelect = () => {
    // Átirányítás a regisztrációs oldalra (/account-sign-up)
    navigate('/account');
  
    // Menü bezárása
    handleAccountClose();
  };

  // Decode the userProfile token
  let decodedToken = null;
  try {
    decodedToken = jwtDecode(userProfile);
  } catch (error) {
    console.error('Invalid token:', error);
  }

  // Button szövegének beállítása a felhasználó nevére, ha van userProfile
  const buttonContent = decodedToken ? decodedToken.name : 'My Account';

  return (
    <>
      <Button
        onClick={handleAccountClick}
        startIcon={<FaUser />}
        variant="text"
        color="inherit"
      >
        {buttonContent}
      </Button>
      <Menu
        id="account-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleAccountClose}
      >
        {decodedToken && <MenuItem onClick={handleAccountSelect}>Account</MenuItem>}
        {decodedToken && <MenuItem onClick={handleLogout}>Logout</MenuItem>}
        {!decodedToken && <MenuItem onClick={handleAccountSelect}>Sign Up</MenuItem>}
      </Menu>
    </>
  );
};

export default AccountMenu;
