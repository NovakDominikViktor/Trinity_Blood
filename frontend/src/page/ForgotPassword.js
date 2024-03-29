import React, { useState } from "react";
import { TextField, Button, Typography, Paper, Grid } from "@mui/material";
import axios from "axios";

const ForgotPassword = () => {
  const [recipientEmail, setRecipientEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState("");

  const handleSendEmail = async () => {
    try {
      await axios.post("http://localhost:5098/api/Email/passwordreset", {
        recipientEmail,
        subject: "Password Reset",
        content: "Click the link in the email to reset your password.",
      });
      setEmailSent(true);
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <Paper elevation={3} style={{ padding: 20 }}>
          <Typography variant="h4" gutterBottom>
            Forgot Password
          </Typography>
          {emailSent ? (
            <Typography variant="body1" gutterBottom>
              An email with instructions to reset your password has been sent
              to {recipientEmail}.
            </Typography>
          ) : (
            <>
              <TextField
                label="Email"
                type="email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                fullWidth
                margin="normal"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSendEmail}
              >
                Send Email
              </Button>
              {error && (
                <Typography variant="body2" color="error" style={{ marginTop: 10 }}>
                  {error}
                </Typography>
              )}
            </>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ForgotPassword;
