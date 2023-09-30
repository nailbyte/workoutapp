import React, { useState, useContext } from "react";

import { Button, TextField, Grid, Typography, Paper } from "@mui/material";
//import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, signOut, onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";

import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { AuthContext } from './AuthContext';

function AuthView() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  
  const {
    user,
    handleSignIn,
    handleSignUp,
    handleGoogleSignIn,
    handleLogout
  } = useContext(AuthContext);

  const onSignIn = async () => {
    try {
      await handleSignIn(email, password);
      setSuccessMessage("Signed in successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setSnackbarOpen(true);
    }
  };

  const onSignUp = async () => {
    try {
      await handleSignUp(email, password);
      setSuccessMessage("Signed up successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setSnackbarOpen(true);
    }
  };

  const onGoogleSignIn = async () => {
    try {
      await handleGoogleSignIn();
      setSuccessMessage("Signed in with Google successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setSnackbarOpen(true);
    }
  };

  const onSignOut = async () => {
    try {
      await handleLogout();
      setSuccessMessage("Signed out successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };
  
  return (
    <Paper elevation={3} style={{ padding: "20px" }}>
      <Typography variant="h5" align="center">
        Workout App
      </Typography>
      <Grid container spacing={2}>
        {!user ? ( // Check if user is NOT signed in
          <>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={onSignIn}
              >
                Sign In
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                onClick={onSignUp}
              >
                Sign Up
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={onGoogleSignIn}
              >
                Sign In with Google
              </Button>
            </Grid>
          </>
        ) : (
          // If user IS signed in
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={onSignOut}
            >
              Sign Out
            </Button>
          </Grid>
        )}
        {error && (
          <Typography variant="body2" color="error" align="center">
            {error}
          </Typography>
        )}
      </Grid>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={error || successMessage}
        action={
          <IconButton
            size="small"
            color="inherit"
            onClick={handleCloseSnackbar}
          >
            <CloseIcon />
          </IconButton>
        }
        style={{
          backgroundColor: error ? "#f44336" : "#4caf50", // red for error, green for success
        }}
      />
    </Paper>
  );  
}

export default AuthView;
