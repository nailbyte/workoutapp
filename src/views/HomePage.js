// HomePage.js

import React from "react";
import { Button, Grid, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();

    const handleStartWorkout = () => {
        navigate("/workoutview");
    };

    const handleCreateProgramCF = () => {
        navigate("/workoutprogramformcf");
    };
    const handleCreateProgram = () => {
        navigate("/workoutprogramform");
    };
    const handleCreateProgramView = () => {
        navigate("/createprogramview");
    };

    return (
        <Container>
            <Grid
                container
                spacing={3}
                direction="column"
                justifyContent="center"
                alignItems="center"
                style={{ minHeight: "100vh" }}
            >
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleStartWorkout}
                    >
                        Start Workout
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleCreateProgram}
                    >
                        Create New Workout Program
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleCreateProgramCF}
                    >
                        Create New Workout Program CF
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleCreateProgramView}
                    >
                        Experiment: Create New Workout Program
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default HomePage;