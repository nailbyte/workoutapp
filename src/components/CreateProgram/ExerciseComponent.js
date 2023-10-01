import React, { useState } from "react";
import { TextField, Card, CardContent, IconButton, Autocomplete } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import exerciseList from '../../utils/ExerciseList';
import CustomTextField from '../common/CustomTextField';

const ExerciseComponent = ({ sets, updateSets, exerciseNumber }) => {
  
  const [selectedExercise, setSelectedExercise] = useState(null);

  const isWeightValid = (weight) => {
    return /^(\d+|\d+\.5)$/.test(weight) && weight <= 999;
  };

  const isRepValid = (rep) => {
    return /^\d+$/.test(rep) && rep <= 999;
  };

  const handleInputChange = (index, field, value) => {
    const newSets = [...sets];
    if (field === "weight" && !isWeightValid(value)) return;
    if (field === "reps" && !isRepValid(value)) return;
    newSets[index][field] = value;
    updateSets(exerciseNumber, newSets);
  };

  const exerciseOptions = Object.keys(exerciseList);

  return (
    <Card variant="outlined" style={{ marginBottom: "16px" }}>
      <CardContent>
        <h3>Exercise {exerciseNumber + 1}:</h3>
        <Autocomplete
          options={exerciseOptions}
          value={selectedExercise}
          onChange={(event, newValue) => setSelectedExercise(newValue)}
          renderInput={(params) => (
            <TextField {...params} label="Exercise" variant="outlined" />
          )}
        />
        {sets.map((set, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            Set {index + 1}:
            {selectedExercise && exerciseList[selectedExercise].weighted && (
              <>
                <CustomTextField
                  type="number"
                  inputProps={{ step: "0.5", min: "0", max: "999" }}
                  value={set.weight}
                  onChange={(e) =>
                    handleInputChange(index, "weight", e.target.value)
                  }
                />{" "}
                Kg
              </>
            )}
            {selectedExercise && exerciseList[selectedExercise].reps && (
              <>
                X{" "}
                <CustomTextField
                  type="number"
                  inputProps={{ min: "0", max: "999" }}
                  value={set.reps}
                  onChange={(e) =>
                    handleInputChange(index, "reps", e.target.value)
                  }
                />{" "}
                reps
              </>
            )}
            {selectedExercise && exerciseList[selectedExercise].timed && (
              <>
                For{" "}
                <CustomTextField
                  type="number"
                  inputProps={{ min: "0" }}
                  value={set.time}
                  onChange={(e) =>
                    handleInputChange(index, "time", e.target.value)
                  }
                />{" "}
                sec
              </>
            )}
            <IconButton
              onClick={() =>
                updateSets(
                  exerciseNumber,
                  sets.filter((_, sIndex) => sIndex !== index)
                )
              }
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </div>
        ))}
        <button
          onClick={() => {
            if (selectedExercise && exerciseList[selectedExercise].timed) {
              updateSets(exerciseNumber, [...sets, { time: 30 }]);
            } else {
              updateSets(exerciseNumber, [...sets, { weight: 10, reps: 12 }]);
            }
          }}
        >
          Add Next Set
        </button>
      </CardContent>
    </Card>
  );
};

export default ExerciseComponent;
