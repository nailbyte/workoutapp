import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Container, CssBaseline } from "@mui/material";
import AuthView from "./AuthView";
import WorkoutView from './WorkoutView';
import WorkoutProgramForm from './WorkoutProgramForm';  // Make sure you import this
import WorkoutProgramFormCF from './WorkoutProgramFormCF';
import HomePage from './HomePage'; // Make sure you import this
import { AuthProvider, AuthContext } from './AuthContext';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { SnackbarProvider } from 'notistack';
import CreateProgramView from "./CreateProgramView";

function Main() {
    const { user } = useContext(AuthContext);
    console.log('Main rendered with user:', user);

    if (!user) {
        return <AuthView />;
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/workoutview" element={<WorkoutView />} />
                    <Route path="/workoutprogramformcf" element={<WorkoutProgramFormCF />} />
                    <Route path="/workoutprogramform" element={<WorkoutProgramForm />} />
                    <Route path="/createprogramview" element={<CreateProgramView />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Router>
        </Container>
    );
}

function App() {
    console.log('App rendered');
    // return (
    //   <AuthProvider>
    //     <Main />
    //   </AuthProvider>
    // );
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
