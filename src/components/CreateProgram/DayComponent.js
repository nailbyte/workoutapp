import React, { useState, useEffect } from "react";
import ExerciseComponent from "./ExerciseComponent";
import { Button, TextField } from "@mui/material";
import { LevelTwoStyle } from "../../styles/LevelledStyle";

const DayComponent = ({ dayNumber, allDaysExercises, setExercisesForDay }) => {
  const [exercises, setExercises] = useState([]);
  const [dayName, setDayName] = useState(`Day ${dayNumber}`);
  const [selectedDayToCopy, setSelectedDayToCopy] = useState(1);

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
    setExercisesForDay({
      dayName: dayName,
      exercises: exercises,
    });
  }, [exercises, dayName]);

  const handleAddExercise = () => {
    const newExercises = [
      ...exercises,
      { exerciseName: null, exerciseId: null, sets: [{ weight: 10, reps: 10 }] },
    ];
    setExercises(newExercises);
  };

  const handleCopyExercises = (selectedDay) => {
    const selectedDayExercises = allDaysExercises[selectedDay - 1];
    if (selectedDayExercises && selectedDayExercises.exercises) {
      const copiedExercises = JSON.parse(JSON.stringify(selectedDayExercises.exercises));
      setExercises(copiedExercises);
      console.log("Selected Day Exercises:", selectedDayExercises);
console.log("Copied Exercises:", copiedExercises);

    }
  };

  return (
    <LevelTwoStyle>
      <div className="day">
        <h2>
          <TextField
            label="Day Name"
            value={dayName}
            onChange={(e) => setDayName(e.target.value)}
            variant="outlined"
            size="small"
            style={{ marginBottom: "10px" }}
          />
        </h2>

        {exercises.map((exercise, exerciseIndex) => (
          <ExerciseComponent
            key={exerciseIndex} // Using exerciseIndex as key to avoid the warning.
            exerciseIndex={exerciseIndex}
            sets={exercise.sets}
            updateSets={updateExerciseSets}
            initialExercise={exercise.exerciseName}
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
        {dayNumber > 1 && (
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
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => handleCopyExercises(selectedDayToCopy)}
            >
              Copy
            </Button>
          </div>
        )}
      </div>
    </LevelTwoStyle>
  );
};

export default DayComponent;
