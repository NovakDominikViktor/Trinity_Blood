import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const DeleteProfileButton = ({ userId, setToken, setUserId }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleDeleteProfile = async () => {
    try {
      const response = await fetch(`http://localhost:5098/api/User/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setToken(null);
        
        // Felhasználói azonosító null-ra állítása
        setUserId(null);
        
        // Törlés a localStorage-ból
        localStorage.removeItem('token');
        
        // Átirányítás a főoldalra (/)
        navigate('/');
      } else {
        console.error('Failed to delete profile');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmDelete = () => {
    handleDeleteProfile();
    handleClose();
  };

  return (
    <div>
      <Button variant="contained" color="error" onClick={handleClickOpen}>
        Delete profile
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Are you sure you want to delete your Profile?</DialogTitle>
        <DialogContent>
          You will not be able to recover your profile once deleted.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirmDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteProfileButton;
