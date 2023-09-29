import React, { useState, useEffect } from "react";
import { auth } from './firebase';  // <-- Important change here

import { Button, TextField, Grid, Typography, Paper } from "@mui/material";
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, signOut, onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";

import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null); // NEW
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  
    setSnackbarOpen(false);
  };
  


  useEffect(() => {
    // This observer returns the current user state.
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Cleanup on component unmount.
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccessMessage("Signed in successfully!");
      setSnackbarOpen(true);
    } catch (error) {
      setError(error.message);
      setSnackbarOpen(true);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      setSuccessMessage("Signed in with Google successfully!");
      setSnackbarOpen(true);
    } catch (error) {
      setError(error.message);
      setSnackbarOpen(true);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setSuccessMessage("Signed out successfully!");
      setSnackbarOpen(true);
    } catch (error) {
      setError(error.message);
      setSnackbarOpen(true);
    }
  };
  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccessMessage("Signed up successfully!");
      setSnackbarOpen(true);
    } catch (error) {
      setError(error.message);
      setSnackbarOpen(true);
    }
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
                onClick={handleSignIn}
              >
                Sign In
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                onClick={handleSignUp}
              >
                Sign Up
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleGoogleSignIn}
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
              onClick={handleSignOut}
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
            onClick={() => setSnackbarOpen(false)}
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

export default Auth;
