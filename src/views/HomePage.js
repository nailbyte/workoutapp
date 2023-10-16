// HomePage.js

import React from "react";
import { Button, Grid, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Logo from '../assets/images/Logo.svg';

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
    const handleProgramView = () => {
        navigate("/programview");
    };
    return (
      <div
        style={{
          backgroundImage: `url(${Logo})`,
          backgroundSize: "80% auto",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          width: "100%",
          paddingTop: "100%",
        }}
      >
        <div
          style={{
            backgroundColor: "#ffc107",
            padding: "10px",
            textAlign: "center",
          }}
        >
          🚧 This app is currently in alpha. It's a work in progress and may
          contain bugs. Quality Engineer 👨 is Don is finding bugs 🐛 and Jon is
          fixing them 🛠️
        </div>
      </div>
    );
    // return (
    //     <Container>
    //         <Grid
    //             container
    //             spacing={3}
    //             direction="column"
    //             justifyContent="center"
    //             alignItems="center"
    //             style={{ minHeight: "100vh" }}
    //         >
    //             <Grid item>
    //                 <Button
    //                     variant="contained"
    //                     color="primary"
    //                     onClick={handleStartWorkout}
    //                 >
    //                     Start Workout
    //                 </Button>
    //             </Grid>
    //             {/* <Grid item>
    //                 <Button
    //                     variant="contained"
    //                     color="secondary"
    //                     onClick={handleCreateProgram}
    //                 >
    //                     Create New Workout Program
    //                 </Button>
    //             </Grid>
    //             <Grid item>
    //                 <Button
    //                     variant="contained"
    //                     color="secondary"
    //                     onClick={handleCreateProgramCF}
    //                 >
    //                     Create New Workout Program CF
    //                 </Button>
    //             </Grid> */}
    //             <Grid item>
    //                 <Button
    //                     variant="contained"
    //                     color="secondary"
    //                     onClick={handleCreateProgramView}
    //                 >
    //                     Create New Workout Program
    //                 </Button>
    //             </Grid>
    //             <Grid item>
    //                 <Button
    //                     variant="contained"
    //                     color="secondary"
    //                     onClick={handleProgramView}
    //                 >
    //                     See Your Workout Program
    //                 </Button>
    //             </Grid>
    //         </Grid>
    //     </Container>
    // );
};

export default HomePage;
