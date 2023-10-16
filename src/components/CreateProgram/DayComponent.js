import React, { useState, useEffect } from "react";
import ExerciseComponent from "./ExerciseComponent";
import { Button, TextField } from "@mui/material";
import { DayLevelStyle } from "../../styles/LevelledStyle";
import CustomTextField from "../common/CustomTextField";
//import { enqueueSnackbar } from "notistack";
import { useSnackbar } from 'notistack';

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
    const filteredExercises = exercises.filter(ex => ex.exerciseName && ex.sets.length > 0);
    setExercisesForDay({
      dayName: dayName,
      exercises: filteredExercises,
    });
  }, [exercises, dayName]);
  

  const handleAddExercise = () => {
    const lastExercise = exercises[exercises.length - 1];
  
    if (!lastExercise || (lastExercise && lastExercise.exerciseName && lastExercise.sets.length > 0)) {
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
      enqueueSnackbar('Please fill in the previous exercise before adding a new one.', { variant: 'error' });

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
        <h2>
          <TextField
            label= {`Day: ${dayNumber}`}
            //placeholder={dayName}
            variant="outlined"
            style={{ marginBottom: "10px" }}
            onChange={(e) => setDayName(e.target.value)}
          />
        </h2>

        {console.log("Inside DayComponent: exercises:", exercises)}
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

        <Button
          sx={{ m: 1 }}
          variant="outlined"
          color="primary"
          onClick={handleAddExercise}
        >
          Add Exercise
        </Button>
        {/* copy element starts */}
        {/* {dayNumber > 1 && (
          <div>
            <label>Copy exercises from: </label>
            <select
              value={selectedDayToCopy}
              onChange={(e) => setSelectedDayToCopy(e.target.value)}
            >
              {Array.from({ length: dayNumber - 1 }, (_, i) => i + 1).map(
                (day) => (
                  <option key={day} value={day}>
                    Day {day}
                  </option>
                )
              )}
            </select>
            {console.log("DayComp:Above the button to copy: :", allDaysExercises)}
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => handleCopyExercises(selectedDayToCopy)}
            >
              Copy
            </Button>
          </div>
        )} */}
        {/* copy element ends */}
      </div>
    </DayLevelStyle>
  );
};

export default DayComponent;
