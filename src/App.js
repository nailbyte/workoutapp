// App.js

import React, { useContext } from "react";
import { Container, CssBaseline } from "@mui/material";
import AuthView from "./AuthView";
import WorkoutView from './WorkoutView';
import { AuthProvider, AuthContext } from './AuthContext';  // Import AuthProvider and AuthContext
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { SnackbarProvider } from 'notistack';


function Main() {
  const { user } = useContext(AuthContext); // This is now valid since Main is a child of AuthProvider in App
  console.log('Main rendered with user:', user);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {user ? <WorkoutView /> : <AuthView />}
    </Container>
  );
}

function App() {
  console.log('App rendered');
  return (
    <SnackbarProvider maxSnack={3}>
    <ThemeProvider theme={theme}>
    <AuthProvider>
      <Main />
    </AuthProvider>
    </ThemeProvider>
    </SnackbarProvider>
  );
}

export default App;
