import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const AccountMenu = ({ onLogout }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const token = localStorage.getItem('token');
  const userProfile = token ? jwtDecode(token).name : null;

  const handleAccountClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAccountClose = () => {
    setAnchorEl(null);
  };

  const handleAccountSelect = () => {
    const accountRoute = userProfile ? '/account' : '/account-sign-up';
    navigate(accountRoute);
    handleAccountClose();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/', { replace: true });
    onLogout();
    handleAccountClose();
  };

  return (
    <div>
      <Button
        onClick={handleAccountClick}
        startIcon={<FaUser />}
        variant="text"
        color="inherit"
      >
        {userProfile || 'My Account'}
      </Button>
      <Menu
        id="account-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleAccountClose}
      >
        {[ 
          userProfile ? (
            <>
              <MenuItem onClick={handleAccountSelect}>Edit Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </>
          ) : (
            <MenuItem onClick={handleAccountSelect}>Sign Up</MenuItem>
          )
        ]}
      </Menu>
    </div>
  );
};

export default AccountMenu;
