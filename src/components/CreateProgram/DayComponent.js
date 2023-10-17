import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

import React, { useState, useEffect } from "react";
import ExerciseComponent from "./ExerciseComponent";
import { Button, TextField, Typography, Box } from "@mui/material";
import { DayLevelStyle, ExerLevelStyle } from "../../styles/LevelledStyle";
import CustomTextField from "../common/CustomTextField";
//import { enqueueSnackbar } from "notistack";
import { useSnackbar } from "notistack";

const DayComponent = ({ dayNumber, allDaysExercises, setExercisesForDay }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [exercises, setExercises] = useState([]);
  const [dayName, setDayName] = useState(`Day: ${dayNumber}`);
  const [selectedDayToCopy, setSelectedDayToCopy] = useState(1);
  const [, forceUpdate] = useState();

  const updateExerciseSets = (exerciseDetails) => {
    const { index, sets, exerciseName, exerciseId } = exerciseDetails;
    const newExercises = [...exercises];

    if (newExercises[index]) {
      newExercises[index].sets = sets;
      newExercises[index].exerciseName = exerciseName;
      newExercises[index].exerciseId = exerciseId;
    } else {
      newExercises.push({ exerciseName: null, exerciseId: null, sets: sets });
    }

    setExercises(newExercises);
  };

  useEffect(() => {
    const filteredExercises = exercises.filter(
      (ex) => ex.exerciseName && ex.sets.length > 0
    );
    setExercisesForDay({
      dayName: dayName,
      exercises: filteredExercises,
    });
  }, [exercises, dayName]);

  const handleAddExercise = () => {
    const lastExercise = exercises[exercises.length - 1];

    if (
      !lastExercise ||
      (lastExercise &&
        lastExercise.exerciseName &&
        lastExercise.sets.length > 0)
    ) {
      const newExercises = [
        ...exercises,
        {
          exerciseName: null,
          exerciseId: null,
          sets: [{ /*time: 30,*/ weight: 10, reps: 10 }],
        },
      ];
      setExercises(newExercises);
    } else {
      enqueueSnackbar(
        "Please fill in the previous exercise before adding a new one.",
        { variant: "error" }
      );
    }
  };

  // const handleCopyExercises =  (selectedDay) => {
  //   console.log("Before update allDaysExercises:", allDaysExercises);
  //   const selectedDayExercises = allDaysExercises[selectedDay - 1];
  //   if (selectedDayExercises && selectedDayExercises.exercises) {
  //     const updatedAllDaysExercises = [...allDaysExercises]; // Shallow copy of the array
  //     updatedAllDaysExercises[updatedAllDaysExercises.length-1].exercises = JSON.parse(JSON.stringify(allDaysExercises[selectedDay - 1].exercises));

  //     setExercises(selectedDayExercises.exercises); // Assuming setAllDaysExercises is the setter for the allDaysExercises state
  //     console.log("Updated Exercises:", updatedAllDaysExercises);
  //     //forceUpdate({});

  //   }
  //   else {
  //     enqueueSnackbar('Please select a valid day to copy exercises from.', { variant: 'error' });
  //   }
  // };

  //TBD remove this
  useEffect(() => {
    console.log("useEffect: Updated state allDaysExercises:", allDaysExercises);
  }, [allDaysExercises]);

  return (
    <DayLevelStyle>
      <div className="day">
        <TextField
          //label= {`Day: ${dayNumber}`}
          placeholder={`Day: ${dayNumber}`}
          variant="standard"
          style={{
            marginBottom: "10px",
            borderBottom: "2px solid rgba(0, 0, 0, 0.42)",
            width: "90%",
          }}
          onChange={(e) => setDayName(e.target.value)}
        />

        {/* {console.log("Inside DayComponent: exercises:", exercises)} */}
        {exercises.map((exercise, exerciseIndex) => (
          <ExerciseComponent
            key={exerciseIndex} // Using exerciseIndex as key to avoid the warning.
            exerciseIndex={exerciseIndex}
            sets={exercise.sets}
            updateSets={updateExerciseSets}
            //initialExercise={exercise.exerciseName}
            exerciseName={exercise.exerciseName}
          />
        ))}
        <ExerLevelStyle>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: "pointer",
              "&:hover": {
                opacity: 0.7,
                textDecoration: "none",
              },
            }}
            onClick={handleAddExercise}
          >
            <PlaylistAddIcon />
            <Typography variant="caption">Add Exercise</Typography>
          </Box>

          {/* <Button
          sx={{ m: 1 }}
          variant="outlined"
          color="primary"
          size="small"
          onClick={handleAddExercise}
        >
          Add Exercise
        </Button> */}
        </ExerLevelStyle>
      </div>
    </DayLevelStyle>
  );
};

export default DayComponent;
