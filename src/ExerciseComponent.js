import React, { useState } from 'react';
import { TextField, Card, CardContent } from '@mui/material';

const ExerciseComponent = ({ exerciseNumber }) => {
  const [sets, setSets] = useState([{ weight: 10, reps: 10 }]);

  const handleAddSet = () => {
    const newSets = [...sets, { weight: 10, reps: 10 }];
    setSets(newSets);
  };

  const isWeightValid = (weight) => {
    return /^(\d+|\d+\.5)$/.test(weight) && weight <= 999;
  };

  const isRepValid = (rep) => {
    return /^\d+$/.test(rep) && rep <= 999;
  };

  const handleInputChange = (index, field, value) => {
    const newSets = [...sets];
    if (field === 'weight' && !isWeightValid(value)) return;
    if (field === 'reps' && !isRepValid(value)) return;
    newSets[index][field] = value;
    setSets(newSets);
  };

  return (
    <Card variant="outlined" style={{ marginBottom: '16px' }}>
      <CardContent>
        <h3>Exercise {exerciseNumber}:</h3>
        {sets.map((set, index) => (
          <div key={index} className="set" style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            Set {index + 1}:
            <TextField
              type="number"
              inputProps={{ step: "0.5", min: "0", max: "999" }}
              sx={{
                margin: '0 4px',
                '& .MuiInputBase-input': {
                  paddingTop: '0px',   // Adjust top padding
                  paddingBottom: '0px'  // Adjust bottom padding
                }
              }}
              value={set.weight}
              onChange={e => handleInputChange(index, 'weight', e.target.value)}
            /> Kg X 
            <TextField
              type="number"
              inputProps={{ min: "0", max: "999" }}
              sx={{
                margin: '0 4px',
                '& .MuiInputBase-input': {
                  paddingTop: '0px',   // Adjust top padding
                  paddingBottom: '0px'  // Adjust bottom padding
                }
              }}
              value={set.reps}
              onChange={e => handleInputChange(index, 'reps', e.target.value)}
            /> reps
          </div>
        ))}
        <button style={{ marginTop: '10px' }} onClick={handleAddSet}>Add Next Set</button>
      </CardContent>
    </Card>
  );
};

export default ExerciseComponent;
