import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AccountMenu = ({ userProfile }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

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

  return (
    <>
      <Button
        onClick={handleAccountClick}
        startIcon={<FaUser />}
        variant="text"
        color="inherit"
      >
        My Account
      </Button>
      <Menu
        id="account-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleAccountClose}
      >
        <MenuItem onClick={handleAccountSelect}>
          {userProfile ? 'Sign In' : 'Sign Up'}
        </MenuItem>
      </Menu>
    </>
  );
};

export default AccountMenu;
