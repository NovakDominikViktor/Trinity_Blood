import React from 'react';

const PutProfile = ({ userId, editedProfile }) => {
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
          // Ide add hozzá azokat a mezőket, amelyeket változtattál
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        console.log('Profile updated successfully');
      } else {
        console.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <button onClick={handlePutProfile}>Profil módosítása</button>
  );
};

export default PutProfile;
