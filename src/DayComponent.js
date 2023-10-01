import React, { useState, useEffect } from "react";
import ExerciseComponent from "./ExerciseComponent";
import { Button, TextField } from "@mui/material";

const DayComponent = ({ dayNumber, allDaysExercises, setExercisesForDay }) => {
  const [exercises, setExercises] = useState([]);
  const [dayName, setDayName] = useState(`Day ${dayNumber}`);
  const [selectedDayToCopy, setSelectedDayToCopy] = useState(1);

  const updateExerciseSets = (exerciseNumber, newSets) => {
    const newExercises = [...exercises];
    newExercises[exerciseNumber] = { ...newExercises[exerciseNumber], sets: newSets };
    setExercises(newExercises);
  };

  useEffect(() => {
    setExercisesForDay(exercises);
  }, [exercises]);

  const handleAddExercise = () => {
    const newExercises = [...exercises, { sets: [{ weight: 10, reps: 10 }] }];
    setExercises(newExercises);
  };

  const handleCopyExercises = (selectedDay) => {
    const selectedDayExercises = allDaysExercises[selectedDay - 1];
    if (selectedDayExercises) {
      const copiedExercises = JSON.parse(JSON.stringify(selectedDayExercises));
      setExercises(copiedExercises);
    }
  };

  return (
    <div className="day">
      <h2>
        Day {dayNumber}{" "}
        <TextField
          label="Day Name"
          value={dayName}
          onChange={(e) => setDayName(e.target.value)}
          variant="outlined"
          size="small"
          style={{ marginBottom: "10px" }}
        />
      </h2>

      {exercises.map((exercise, index) => (
        <ExerciseComponent
          key={index}
          exerciseNumber={index}
          sets={exercise.sets}
          updateSets={updateExerciseSets}
        />
      ))}

      <button onClick={handleAddExercise}>Add Next Exercise</button>

      {dayNumber > 1 && (
        <div>
          <label>Copy exercises from: </label>
          <select value={selectedDayToCopy} onChange={(e) => setSelectedDayToCopy(e.target.value)}>
            {Array.from({ length: dayNumber - 1 }, (_, i) => i + 1).map((day) => (
              <option key={day} value={day}>
                Day {day}
              </option>
            ))}
          </select>
          <Button variant="contained" color="primary" size="small" onClick={() => handleCopyExercises(selectedDayToCopy)}>
            Copy
          </Button>
        </div>
      )}
    </div>
  );
};

export default DayComponent;
