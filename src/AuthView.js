import React, { useState, useContext } from "react";

import { Button, TextField, Grid, Typography, Paper } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

import { AuthContext } from "./AuthContext";
import { useTheme } from '@mui/material/styles';
import { useSnackbar } from 'notistack';

function AuthView() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();

  const { user, handleSignIn, handleSignUp, handleGoogleSignIn, handleLogout } =
    useContext(AuthContext);

  const onSignIn = async () => {
    try {
      await handleSignIn(email, password);
      enqueueSnackbar('Signed in successfully!', { variant: 'success' });
    } catch (err) {
      enqueueSnackbar(err.message, { variant: 'error' });
    }
  };

  const onSignUp = async () => {
    try {
      await handleSignUp(email, password);
      enqueueSnackbar('Signed up successfully!', { variant: 'success' });
    } catch (err) {
      enqueueSnackbar(err.message, { variant: 'error' });
    }
  };

  const onGoogleSignIn = async () => {
    try {
      await handleGoogleSignIn();
      enqueueSnackbar('Signed in with Google successfully!', { variant: 'success' });
    } catch (err) {
      enqueueSnackbar(err.message, { variant: 'error' });
    }
  };

  const onSignOut = async () => {
    try {
      await handleLogout();
      enqueueSnackbar('Signed out successfully!', { variant: 'success' });
    } catch (err) {
      enqueueSnackbar(err.message, { variant: 'error' });
    }
  };

  return (
    <Paper
      elevation={3}
      style={{ padding: theme.spacing(3), maxWidth: "400px", margin: "0 auto" }}
    >
      <Typography variant="h5" align="center" gutterBottom>
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
                startIcon={<GoogleIcon />} // Add the Google Icon
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
      </Grid>
    </Paper>
  );
}

export default AuthView;
