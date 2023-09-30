// App.js

import React, { useContext } from "react";
import { Container, CssBaseline } from "@mui/material";
import AuthView from "./AuthView";
import WorkoutView from './WorkoutView';
import { AuthProvider, AuthContext } from './AuthContext';  // Import AuthProvider and AuthContext

function Main() {
  const { user } = useContext(AuthContext); // This is now valid since Main is a child of AuthProvider in App

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {user ? <WorkoutView /> : <AuthView />}
    </Container>
  );
}

function App() {
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
}

export default App;
