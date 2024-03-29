import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper, Grid, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [passwordResetSuccess, setPasswordResetSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromURL = urlParams.get("token");
    const decodedToken = decodeURIComponent(tokenFromURL.replace(/\s/g, "+"));
    const emailFromURL = decodeURIComponent(atob(urlParams.get("email") || ""));
    setToken(decodedToken);
    setEmail(emailFromURL);
  }, []);

  const handleResetPassword = async () => {
    if (newPassword === confirmNewPassword) {
      setPasswordsMatch(true);

      try {
        const response = await axios.post(
          "http://localhost:5098/api/Auth/resetpassword",
          {
            email: email,
            token: token,
            newPassword: newPassword
          }
        );
        setPasswordResetSuccess(true);
        navigate('/');
      } catch (error) {
        setErrorMessage(error.response.data);
      }
    } else {
      setPasswordsMatch(false);
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <Paper elevation={3} style={{ padding: 20 }}>
          <Typography variant="h4" gutterBottom>
            Reset Password
          </Typography>
          {!passwordResetSuccess ? (
            <Box mt={2}>
              <TextField
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Confirm New Password"
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                fullWidth
                margin="normal"
                error={!passwordsMatch}
                helperText={!passwordsMatch && "Passwords do not match"}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleResetPassword}
                style={{ marginTop: 20 }}
              >
                Reset Password
              </Button>
              {errorMessage && (
                <Typography color="error" style={{ marginTop: 10 }}>
                  {errorMessage}
                </Typography>
              )}
            </Box>
          ) : (
            <Typography variant="body1">
              Password reset successfully!
            </Typography>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ResetPassword;
