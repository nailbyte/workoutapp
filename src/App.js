import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Container, CssBaseline } from "@mui/material";
import AuthView from "./views/AuthView";
import WorkoutView from './views/WorkoutView';
import WorkoutProgramForm from './WorkoutProgramForm';  // Make sure you import this
import WorkoutProgramFormCF from './WorkoutProgramFormCF';
import HomePage from './views/HomePage'; // Make sure you import this
import { AuthProvider, AuthContext } from './components/AuthContext';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { SnackbarProvider } from 'notistack';
import CreateProgramView from "./views/CreateProgramView";
import ProgramView from "./views/ProgramView";
import PlaygroundView from "./views/PlaygroundView";
import Copyright from "./components/common/Copyright";
import ResponsiveAppBar from "./components/layouts/ResponsiveAppBar";
import './styles/styles.css'; 

function Main() {
    const { user } = useContext(AuthContext);
    console.log('Main rendered with user:', user);

    if (!user) {
        return <AuthView />;
    }

    return (
        <Container component="main" maxWidth="sm"> 
            <CssBaseline />
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/workoutview" element={<WorkoutView />} />
                    <Route path="/workoutprogramformcf" element={<WorkoutProgramFormCF />} />
                    <Route path="/workoutprogramform" element={<WorkoutProgramForm />} />
                    <Route path="/createprogramview" element={<CreateProgramView />} />
                    <Route path="/programview" element={<ProgramView />} />
                    <Route path="/pg" element={<PlaygroundView />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Router>
            <Copyright sx={{ mt: 5 }} />
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
                <ResponsiveAppBar />
                    <Main />
                </AuthProvider>
            </ThemeProvider>
        </SnackbarProvider>
    );
}

export default App;
