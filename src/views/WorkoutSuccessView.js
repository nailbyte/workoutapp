import React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Lottie from "lottie-react";
import successAnimation from "../assets/images/Celebration.json";
import Grid from "@mui/material/Grid";

const WorkoutSuccessView = ({ workoutData }) => {
  if (!workoutData) return null;

  // Assuming workoutData has startTime and finishTime as Date objects
  //const workoutDuration = new Date(workoutData.finishTime - workoutData.startTime);
  const hours = 1; // workoutDuration.getUTCHours();
  const minutes = 0; //workoutDuration.getUTCMinutes();

  return (
    <Paper elevation={3} sx={{ padding: '20px', marginTop: '20px', position: 'relative' }}>
        <div className="lottie-overlay">
            <Lottie 
                animationData={successAnimation}
                loop={false}
                autoplay
                className="lottie-animation"
            />
        </div>

        <Grid container direction="column" alignItems="center" justifyContent="center" spacing={2}>        
        <Grid item>
          <Typography variant="h5" gutterBottom>
            Workout Summary
          </Typography>
        </Grid>

        <Grid item>
          <Typography variant="h6">{workoutData.programName}</Typography>
        </Grid>

        <Grid item>
          <Typography variant="subtitle1" gutterBottom>
            Duration: {hours}h {minutes}m
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ margin: "10px 0" }} />
          <List sx={{ textAlign: "left", width: "100%" }}>
            {workoutData.TodaysExercises.map((exercise, idx) => (
              <ListItem key={idx} dense>
                <Typography variant="body2">
                  {exercise.exerciseName}:{" "}
                  {exercise.sets.map((set, setIdx) => (
                    <span key={setIdx}>
                      {set.weight}kg x {set.reps} reps
                      {setIdx !== exercise.sets.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default WorkoutSuccessView;
