import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const DeleteProfileButton = ({ userId }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleDeleteProfile = async () => {
    try {
      const response = await fetch(`http://localhost:5098/api/User/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        navigate('/account-sign-up');
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
        Profil törlése
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Biztosan törölni szeretnéd a profilt?</DialogTitle>
        <DialogContent>
          A profil törlésével minden kapcsolódó adat véglegesen elveszik.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Mégse</Button>
          <Button onClick={handleConfirmDelete} autoFocus>
            Törlés
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteProfileButton;
