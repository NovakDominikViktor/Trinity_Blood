import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DeleteProfileButton = ({ userId }) => { // Az azonosítót props-ként adjuk át a komponensnek
  const navigate = useNavigate();

  const handleDeleteProfile = async () => {
    try {
      // Hívj egy API végpontot a felhasználó profiljának törlésére
      const response = await fetch(`http://localhost:5098/api/User/${userId}`, { // Az azonosítót beillesztjük az URL-be
        method: 'DELETE',
        // Egyéb szükséges adatok a törléshez, például a felhasználó azonosítója vagy tokenje
      });
      
      if (response.ok) {
        // Ha a törlés sikeres, navigálj az "account-sign-up" oldalra
        navigate('/account-sign-up');
      } else {
        console.error('Failed to delete profile');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <button onClick={handleDeleteProfile}>Profil törlése</button>
  );
};

export default DeleteProfileButton;
