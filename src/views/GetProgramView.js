// getProgramView.js

import React from "react";
import { Grid, Typography, Divider } from "@mui/material";
import { DayLevelStyle, ExerLevelStyle, SetLevelStyle } from "../styles/LevelledStyle";
import exerciseList from "../utils/ExerciseList";
import formatTime from "../utils/FormatTime";

const GetProgramView = ({ currentProgram }) => {
    return (
        <Grid container spacing={0} direction="column">
            {currentProgram.allDaysExercises && currentProgram.allDaysExercises.length > 0 ? (
                currentProgram.allDaysExercises.map((dayObj, dayIndex) => (
                    <Grid item key={dayObj.id || dayObj.dayName} style={{ padding: "12px" }}>
                        <DayLevelStyle>
                            <Typography>{dayObj.dayName}</Typography>
                            <Divider width="90%" />

                            <Grid container spacing={3}>
                                {dayObj.exercises.map((exerciseObj, exerciseIndex) => (
                                    <Grid item xs={6} key={exerciseObj.exerciseId + "-" + exerciseIndex}>
                                        <ExerLevelStyle>
                                            <Typography>{exerciseObj.exerciseName}</Typography>
                                            {exerciseObj.sets.map((set, index) => {
                                                const exerciseDetail = exerciseList[exerciseObj.exerciseId];
                                                let setDetail = "";

                                                if (exerciseDetail.weighted) {
                                                    setDetail += `${set.weight} kg `;
                                                }
                                                if (exerciseDetail.reps) {
                                                    setDetail += `for ${set.reps} reps `;
                                                }
                                                if (exerciseDetail.timed) {
                                                    setDetail += `for ${formatTime(set.time)}`;
                                                }
                                                return (
                                                    <SetLevelStyle key={index}>
                                                        <Typography variant="body2">
                                                            Set {index + 1}: {setDetail}
                                                        </Typography>
                                                    </SetLevelStyle>
                                                );
                                            })}
                                        </ExerLevelStyle>
                                    </Grid>
                                ))}
                            </Grid>
                        </DayLevelStyle>
                    </Grid>
                ))
            ) : (
                <Grid item>
                    <Typography variant="body1">No exercises for this program.</Typography>
                </Grid>
            )}
        </Grid>
    );
};

export default GetProgramView;
