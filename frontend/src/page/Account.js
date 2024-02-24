import React, { useState, useEffect } from 'react';
import { Avatar, Box, Button, Container, CssBaseline, Grid, Paper, Tab, Tabs, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Importáljuk a jwt_decode függvényt a tokendekódoláshoz
import DeleteProfile from '../component/DeleteProfile'; // Importáljuk a törlés gomb komponenst
import PutProfile from '../component/PutProfile'; // Importáljuk a PutProfile komponenst

const Account = () => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState(0);
  const [editedProfile, setEditedProfile] = useState(null);
  const jwt_decode = jwtDecode;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const decodedToken = jwt_decode(token); // Token dekódolása
        const userId = decodedToken.sub; // Felhasználó azonosítójának meghatározása a dekódolt tokentől

        const response = await fetch(`http://localhost:5098/api/User/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.ok) {
          const userData = await response.json();
          setEditedProfile(userData);
        } else {
          console.error('Failed to fetch user data:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleChangeTab = (event, newValue) => setCurrentTab(newValue);

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

  

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper elevation={3} square>
        <Box p={3} display="flex" flexDirection="column" alignItems="center">
          <Avatar src={editedProfile?.profilePic} alt="Profil" sx={{ width: 80, height: 80 }} />
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
          {currentTab === 0 && editedProfile && (
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
          {currentTab === 1 && editedProfile && (
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
                <PutProfile userId={editedProfile?.id}  editedProfile={editedProfile}/>
              </Grid>
            </Grid>
          )}
          {currentTab === 2 && (
            <DeleteProfile userId={editedProfile?.id} />
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default Account;
