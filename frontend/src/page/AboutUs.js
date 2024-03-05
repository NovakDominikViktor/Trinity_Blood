import React from 'react';
import { Typography, Grid, Avatar, Paper, Box } from '@mui/material';

const AboutUs = () => {
  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom>About Us</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Avatar sx={{ width: 150, height: 150 }} alt="Johnny Sins" src="johnny_sins.jpg" />
                  <Typography variant="h6">Dr. Johnny Sins</Typography>
                  <Typography>
                    Johnny is our experienced doctor who is committed to taking care of your health needs. With his
                    expertise and compassionate approach, you can trust that you're in good hands.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Avatar sx={{ width: 150, height: 150 }} alt="Ryan Reynolds" src="ryan_reynolds.jpg" />
                  <Typography variant="h6">Ryan Reynolds</Typography>
                  <Typography>
                    Ryan is our versatile actor with a knack for bringing characters to life on the screen. He adds
                    depth and humor to our team, always ready to tackle any challenge that comes our way.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Avatar sx={{ width: 150, height: 150 }} alt="Korda György" src="korda_gyorgy.jpg" />
                  <Typography variant="h6">Korda György</Typography>
                  <Typography>
                    György brings a unique perspective to our team with his "yes" attitude and enthusiasm. He may not
                    have a specific title like the others, but his positive energy and willingness to contribute make
                    him an invaluable member.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom>Our Team Culture</Typography>
            <Typography>
              At our core, we value professionalism, creativity, and collaboration. We believe in delivering
              exceptional results while maintaining a supportive and inclusive work environment.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom>Contact Us</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Typography variant="h6">Dr. Johnny Sins</Typography>
                  <Typography>Tel: (36) 20 696 1223</Typography>
                  <Typography>Email: johnyph69@gmail.com</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Typography variant="h6">Ryan Reynolds</Typography>
                  <Typography>Tel: (36) 30 445 2234</Typography>
                  <Typography>Email: ryanpool2@citromail.hu</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Typography variant="h6">Korda György</Typography>
                  <Typography>Tel: (36) 70 601 4556</Typography>
                  <Typography>Email: reptérgyuribaa73@gmail.com</Typography>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AboutUs;
