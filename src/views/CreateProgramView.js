import React, { useState } from "react";
import { Button, Card, CardContent, TextField } from "@mui/material";
import DayComponent from "../components/CreateProgram/DayComponent";
import {LevelOneStyle} from "../styles/LevelledStyle";

const CreateProgramView = () => {
  const [programName, setProgramName] = useState("");
  const [numberOfDays, setNumberOfDays] = useState(1);
  const [allDaysExercises, setAllDaysExercises] = useState([[]]);

  const handleAddDay = () => {
    setNumberOfDays((prev) => prev + 1);
    setAllDaysExercises((prev) => [...prev, []]);
  };

  const handleRemoveDay = () => {
    if (numberOfDays > 1) {
      setNumberOfDays((prev) => prev - 1);
      setAllDaysExercises((prev) => {
        const newDays = [...prev];
        newDays.pop();
        return newDays;
      });
    }
  };

  return (
    <div className="create-program">
      <LevelOneStyle>
        <TextField
          label="Program Name"
          value={programName}
          onChange={(e) => setProgramName(e.target.value)}        
          fullWidth
        />

        {Array.from({ length: numberOfDays }).map((_, dayIndex) => (
          <DayComponent
            key={dayIndex}
            dayNumber={dayIndex + 1}
            allDaysExercises={allDaysExercises}
            setExercisesForDay={(exercises) => {
              const updatedDays = [...allDaysExercises];
              updatedDays[dayIndex] = exercises;
              setAllDaysExercises(updatedDays);
            }}
          />
        ))}
        <div className="day-actions">
          <Button variant="outlined" color="primary" onClick={handleAddDay}>
            Add Day
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleRemoveDay}
            disabled={numberOfDays <= 1}
          >
            Remove Last Day
          </Button>
        </div>
        <Button
          // style={{ marginTop: "20px" }}
          variant="contained"
          color="primary"
          onClick={() => console.log(allDaysExercises)}
        >
          Submit
        </Button>

      </LevelOneStyle>
    </div>
  );
};

export default CreateProgramView;
