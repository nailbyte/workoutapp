import React, { useState } from 'react';
import ExerciseComponent from './ExerciseComponent';
import { Button, Card, CardContent, TextField, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const DayComponent = ({ dayNumber, allDaysExercises }) => {
  const [exercises, setExercises] = useState([]);

  const handleAddExercise = () => {
    const newExercises = [...exercises, {}]; 
    setExercises(newExercises);
  };

  const handleCopyExercises = (selectedDay) => {
    const selectedDayExercises = allDaysExercises[selectedDay];
    if (selectedDayExercises) {
      setExercises([...selectedDayExercises]);
    }
  };

  return (
    <div className="day">
      <h2>Day {dayNumber}</h2>
      
      {exercises.map((exercise, index) => (
        <ExerciseComponent key={index} exercise={exercise} />
      ))}
      
      <button onClick={handleAddExercise}>Add Next Exercise</button>
      
      {dayNumber > 1 && (
        <div>
          <label>Copy exercises from: </label>
          <select onChange={(e) => handleCopyExercises(e.target.value)}>
            {/* Provide options up to current day minus one */}
            {Array.from({ length: dayNumber - 1 }, (_, i) => i + 1).map(day => (
              <option key={day} value={day}>Day {day}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default DayComponent;
