import React, { useState, useEffect } from "react";
import { auth } from './firebase';  // <-- Important change here

import { Button, TextField, Grid, Typography, Paper } from "@mui/material";
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";


function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null); // NEW


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
      alert("Signed in successfully!");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert("Signed in with Google successfully!");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      alert("Signed out successfully!");
    } catch (error) {
      alert(error.message);
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
                color="primary"
                onClick={handleGoogleSignIn}
              >
                Sign In with Google
              </Button>
            </Grid>
          </>
        ) : ( // If user IS signed in
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
      </Grid>
    </Paper>
  );  
}

export default Auth;
