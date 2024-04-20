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
                  <Avatar sx={{ width: 150, height: 150 }} alt="Kovács Dániel" src="johnny_sins.jpg" />
                  <Typography variant="h6">Kovács Dániel</Typography>
                  <Typography>
                    Dani is the founder and CEO of Trinity Blood. He brings a unique perspective to our team and is a great emotional support person.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Avatar sx={{ width: 150, height: 150 }} alt="Ryan Reynolds" src="ryan_reynolds.jpg" />
                  <Typography variant="h6">Braczkó Tamás</Typography>
                  <Typography>
                    Tamás is the guy responsible for testing our products. He ensures that everything works smoothly before it reaches our customers.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Avatar sx={{ width: 150, height: 150 }} alt="Novák Dominik Viktor" src="korda_gyorgy.jpg" />
                  <Typography variant="h6">Novák Dominik Viktor</Typography>
                  <Typography>
                    Dominik is the one who drives most of our coding efforts. He's a skilled developer who crafts the backbone of our products.
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
      </Grid>
    </Box>
  );
};

export default AboutUs;
