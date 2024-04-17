import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button} from '@mui/material';
const PutProfile = ({ userId, editedProfile, setToken, setUserId }) => {

  const navigate = useNavigate();
  const handlePutProfile = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`http://localhost:5098/api/User/${userId}`, {
        method: 'PUT',
        body: JSON.stringify({
          id: userId,
          firstName: editedProfile.firstName,
          lastName: editedProfile.lastName,
          email: editedProfile.email,
          
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        console.log('Profile updated successfully');

        // Token null-ra állítása
        setToken(null);
        
        // Felhasználói azonosító null-ra állítása
        setUserId(null);
        
        // Törlés a localStorage-ból
        localStorage.removeItem('token');
        
        // Átirányítás a főoldalra (/)
        navigate('/');
      } else {
        console.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Button variant='contained' color='warning' onClick={handlePutProfile}>Update profile</Button>
  );
};

export default PutProfile;
