import React from "react";
import { TextField, Card, CardContent, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import CustomTextField from './components/common/CustomTextField';

const ExerciseComponent = ({ sets, updateSets, exerciseNumber }) => {
  
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

  return (
    <Card variant="outlined" style={{ marginBottom: "16px" }}>
      <CardContent>
        <h3>Exercise {exerciseNumber + 1}:</h3>
        {sets.map((set, index) => (
          <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
            Set {index + 1}:
            <CustomTextField
              type="number"
              inputProps={{ step: "0.5", min: "0", max: "999" }}
              value={set.weight}
              onChange={(e) => handleInputChange(index, "weight", e.target.value)}
            />
            Kg X
            <CustomTextField
              type="number"
              inputProps={{ min: "0", max: "999" }}
              value={set.reps}
              onChange={(e) => handleInputChange(index, "reps", e.target.value)}
            />
            reps
            <IconButton onClick={() => updateSets(exerciseNumber, sets.filter((_, sIndex) => sIndex !== index))}>
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </div>
        ))}
        <button onClick={() => updateSets(exerciseNumber, [...sets, { weight: 10, reps: 10 }])}>
          Add Next Set
        </button>
      </CardContent>
    </Card>
  );
};

export default ExerciseComponent;
