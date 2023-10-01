import React, { useState, useEffect } from "react";
import ExerciseComponent from "./ExerciseComponent";
import {
  Button,
  Card,
  CardContent,
  TextField,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const DayComponent = ({ dayNumber, allDaysExercises, setExercisesForDay }) => {
  const [exercises, setExercises] = useState([]);
  const [dayName, setDayName] = useState(`Day ${dayNumber}`);
  const [selectedDayToCopy, setSelectedDayToCopy] = useState(1);

  useEffect(() => {
    setExercisesForDay(exercises);  // This function was passed as a prop from the parent
}, [exercises]);


  const handleAddExercise = () => {
    const newExercises = [...exercises, {}];
    setExercises(newExercises);
    // Notify the parent
    setExercisesForDay(newExercises);
  };

  const handleCopyExercises = (selectedDay) => {
    const selectedDayExercises = allDaysExercises[selectedDay - 1];  // adjust indexing since array index starts from 0
    if (selectedDayExercises) {
      // Deep copy the exercises
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
        <ExerciseComponent key={index} exercise={exercise} />
      ))}

      <button onClick={handleAddExercise}>Add Next Exercise</button>

      {dayNumber > 1 && (
        <div>
          <label>Copy exercises from: </label>
          <select
            value={selectedDayToCopy}
            onChange={(e) => setSelectedDayToCopy(e.target.value)}
            //onChange={(e) => handleCopyExercises(e.target.value)}
          >
            {/* Provide options up to current day minus one */}
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
            style={{ marginLeft: "10px" }}
          >
            Copy
          </Button>
        </div>
      )}
    </div>
  );
};

export default DayComponent;
