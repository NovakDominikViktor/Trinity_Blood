// Account.jsx
import React, { useState } from 'react';
import {
  Avatar, Box, Button, Container, CssBaseline, Grid, Paper, Tab, Tabs, TextField, Typography
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';

const dummyProfile = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  profilePic: 'https://via.placeholder.com/150', // Placeholder image URL
};

const Account = () => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState(0);
  const [editedProfile, setEditedProfile] = useState({
    firstName: dummyProfile.firstName,
    lastName: dummyProfile.lastName,
    email: dummyProfile.email,
    profilePic: dummyProfile.profilePic,
  });

  const handleChangeTab = (event, newValue) => setCurrentTab(newValue);

  const handleDeleteAccount = () => {
    console.log('Profil törölve!');
  };

  const handleNavigateToSignUp = () => navigate('/account-sign-up');

  const handleEditProfileChange = (field, value) => {
    setEditedProfile((prevProfile) => ({
      ...prevProfile,
      [field]: value,
    }));
  };

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newProfilePic = e.target.result;
        setEditedProfile((prevProfile) => ({
          ...prevProfile,
          profilePic: newProfilePic,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfileChanges = () => {
    console.log('Profil változások elmentve:', editedProfile);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper elevation={3} square>
        <Box p={3} display="flex" flexDirection="column" alignItems="center">
          <Avatar src={editedProfile.profilePic} alt="Profil" sx={{ width: 80, height: 80 }} />
          <input type="file" accept="image/*" id="profilePicInput" style={{ display: 'none' }} onChange={handleProfilePicChange} />
          <label htmlFor="profilePicInput">
            <Button variant="outlined" component="span" sx={{ mt: 2 }}>
              Profilkép beállítása
            </Button>
          </label>
          <Typography variant="h5" sx={{ mt: 2 }}>
            Profilom
          </Typography>
          <Tabs value={currentTab} indicatorColor="primary" textColor="primary" onChange={handleChangeTab} variant="fullWidth" sx={{ mt: 2 }}>
            <Tab label="Profilom" />
            <Tab label="Profil szerkesztése" />
            <Tab label="Profil törlése" />
          </Tabs>
          {currentTab === 0 && (
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12}>
                <Typography variant="h6">Személyes információ</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">
                  <strong>Keresztnév:</strong> {editedProfile.firstName}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">
                  <strong>Vezetéknév:</strong> {editedProfile.lastName}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">
                  <strong>Email:</strong> {editedProfile.email}
                </Typography>
              </Grid>
            </Grid>
          )}
          {currentTab === 1 && (
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12}>
                <Typography variant="h6">Profil szerkesztése</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Keresztnév"
                  value={editedProfile.firstName}
                  onChange={(e) => handleEditProfileChange('firstName', e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Vezetéknév"
                  value={editedProfile.lastName}
                  onChange={(e) => handleEditProfileChange('lastName', e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  value={editedProfile.email}
                  onChange={(e) => handleEditProfileChange('email', e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={handleSaveProfileChanges}>
                  Változtatások Mentése
                </Button>
              </Grid>
            </Grid>
          )}
          {currentTab === 2 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1">
                Biztos törölni akarod a profilodat? Ez végleges meg izé!
              </Typography>
              <Button variant="contained" color="error" onClick={handleDeleteAccount}>
                Profil Törlése
              </Button>
            </Box>
          )}
          {currentTab === 0 && (
            <Button variant="contained" color="primary" onClick={handleNavigateToSignUp} sx={{ mt: 2 }}>
              Kijelentkezés
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default Account;
