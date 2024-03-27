import React, { useState, useEffect } from "react";
import { TextField, Button, Typography } from "@mui/material";
import axios from "axios";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [passwordResetSuccess, setPasswordResetSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromURL = urlParams.get("token");
    const decodedToken = decodeURIComponent(tokenFromURL.replace(/\s/g, '+'));
    const emailFromURL = decodeURIComponent(atob(urlParams.get("email") || ""));
    setToken(decodedToken);
    setEmail(emailFromURL);
  }, []);
  

  const handleResetPassword = async () => {
    if (newPassword === confirmNewPassword) {
      setPasswordsMatch(true);
  
      try {
        console.log("Data to be sent:", { email, token, newPassword }); // Logging the data to be sent
        const response = await axios.post(
          "http://localhost:5098/api/Auth/resetpassword",
          {
            email: email,
            token: token, // Using the token as it is
            newPassword: newPassword
          }
        );
  
        setPasswordResetSuccess(true);
      } catch (error) {
        setErrorMessage(error.response.data);
      }
    } else {
      setPasswordsMatch(false);
    }
  };
  

  return (
    <div>
      <Typography variant="h4">Reset Password</Typography>
      {!passwordResetSuccess ? (
        <>
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
          >
            Reset Password
          </Button>
          {errorMessage && (
            <Typography color="error">{errorMessage}</Typography>
          )}
        </>
      ) : (
        <Typography>Password reset successfully!</Typography>
      )}
    </div>
  );
}

export default ResetPassword;
