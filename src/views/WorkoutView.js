import React, { useState, useEffect, useContext, useCallback } from "react";
import { db } from "../firebase";
import { Paper, Button, Grid, Typography } from "@mui/material";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
import { AuthContext } from "../components/AuthContext";
import { addDoc } from "firebase/firestore";
import { useTheme } from "@mui/material/styles";
import { useSnackbar } from "notistack";

import {
  LinearIndeterminate,
  CircularIndeterminate,
  CircularWithValueLabel,
} from "../components/common/LoadingComp";
import exerciseList from "../utils/ExerciseList";
import { ProgLevelStyle, DayLevelStyle, ExerLevelStyle, SetLevelStyle } from "../styles/LevelledStyle";
import CustomTextField from "../components/common/CustomTextField";

function WorkoutView() {
  console.log("WorkoutView rendered"); //TBD remove this

  const [userData, setUserData] = useState(null);
  const [lastWorkoutLog, setLastWorkoutLog] = useState(null);
  const [todayWorkoutData, setTodayWorkoutData] = useState(null);
  const { user, handleLogout } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);

  const { enqueueSnackbar } = useSnackbar();

  const theme = useTheme();

  const isWeightValid = (weight) => {
    return /^(\d+|\d+\.5)$/.test(weight) && weight <= 999;
  };

  const isRepValid = (rep) => {
    return /^\d+$/.test(rep) && rep <= 999;
  };
  const updateTime = (index, minutes, seconds) => {
    const totalSeconds = (minutes * 60) + seconds;
    handleInputChange(index, "time", totalSeconds);
  };


  const fetchAndSetUserData = useCallback(async () => {
    try {
      const userDocRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userDocRef);
      if (!userSnap.exists()) {
        throw new Error("User data not found.");
      }
      const userData = {
        uid: user.uid,
        ...userSnap.data(),
      };
      setUserData(userData);
      return userData;
    } catch (err) {
      enqueueSnackbar("Failed to fetch user data. Please try again later.", {
        variant: "error",
      });
      console.error("Error getting User details:", err);
    }
  }, [enqueueSnackbar, user, setUserData]);

  const fetchAndSetLastWorkoutLog = useCallback(
    async (fetchedUserData) => {
      const q = query(
        collection(db, "workoutLogs"),
        where("user", "==", fetchedUserData.uid),
        where("WorkoutTemplate", "==", fetchedUserData.currentWorkoutTemplate),
        orderBy("date", "desc"),
        limit(1)
      );
      try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const lastWorkoutLog = querySnapshot.docs[0].data();
          console.log(
            "fetchAndSetLastWorkoutLog:lastWorkoutLog:",
            lastWorkoutLog
          );
          setLastWorkoutLog(lastWorkoutLog);
          return lastWorkoutLog;
        }
        return null;
      } catch (err) {
        enqueueSnackbar(
          "Failed to fetch workout logs. Please try again later.",
          { variant: "error" }
        );
        console.error("Trouble getting workout logs: ", err);
      }
    },
    [enqueueSnackbar, setLastWorkoutLog]
  );

  const fetchAndSetTodayWorkoutData = useCallback(
    async (fetchedUserData, fetchedLastWorkoutLog) => {
      try {
        const workoutDocRef = doc(
          db,
          "workoutTemplates",
          fetchedUserData.currentWorkoutTemplate
        );
        const docSnap = await getDoc(workoutDocRef);
        if (docSnap.exists()) {
          const workoutTemplate = docSnap.data();
          if (
            !workoutTemplate.allDaysExercises ||
            workoutTemplate.allDaysExercises.length === 0
          ) {
            throw new Error("Invalid workout template: no exercises defined.");
          }

          const lastWorkoutDayIndex = fetchedLastWorkoutLog
            ? parseInt(fetchedLastWorkoutLog.dayIdx)
            : -1; // start with -1 if no previous logs

          const nextWorkoutDayIndex =
            lastWorkoutDayIndex + 1 >= workoutTemplate.allDaysExercises.length
              ? 0
              : lastWorkoutDayIndex + 1;

          const todayWorkoutData = {
            dayIdx: nextWorkoutDayIndex.toString(),
            dayName:
              workoutTemplate.allDaysExercises[nextWorkoutDayIndex].dayName,
            programName: workoutTemplate.programName,
            TodaysExercises:
              workoutTemplate.allDaysExercises[nextWorkoutDayIndex].exercises,
          };

          setTodayWorkoutData(todayWorkoutData);
          return todayWorkoutData;
        } else {
          throw new Error("Workout template not found.");
        }
      } catch (err) {
        enqueueSnackbar(
          "Failed to fetch Workout Program details. Please try again later.",
          { variant: "error" }
        );
        console.error("Error getting workout template:", err);
      }
    },
    [enqueueSnackbar, setTodayWorkoutData]
  );

  useEffect(() => {
    if (user) {
      (async () => {
        try {
          setLoading(true);
          const fetchedUserData = await fetchAndSetUserData();
          const fetchedLastWorkoutLog = await fetchAndSetLastWorkoutLog(
            fetchedUserData
          );
          console.log(
            "useEffect:fetchedLastWorkoutLog:",
            fetchedLastWorkoutLog
          );
          await fetchAndSetTodayWorkoutData(
            fetchedUserData,
            fetchedLastWorkoutLog
          );
          enqueueSnackbar("Data loaded successfully.", { variant: "success" });
        } catch (err) {
          enqueueSnackbar("Failed to load data. Please try again later.", {
            variant: "error",
          });
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [
    user,
    enqueueSnackbar,
    fetchAndSetLastWorkoutLog,
    fetchAndSetTodayWorkoutData,
    fetchAndSetUserData,
  ]);



  const handleInputChange = (exerciseId, setIndex, type, value) => {
    if (type === "weight" && !isWeightValid(value)) return;
    if (type === "reps" && !isRepValid(value)) return;
    
    setTodayWorkoutData((prevState) => {
      const newExercises = [...prevState.TodaysExercises];
      const exerciseToUpdate = newExercises.find((ex) => ex.exerciseId === exerciseId);
      if (exerciseToUpdate && exerciseToUpdate.sets[setIndex]) {
        exerciseToUpdate.sets[setIndex][type] = value;
      }
      return { ...prevState, TodaysExercises: newExercises };
    });
  };
  

  // Local Storage Logic
  useEffect(() => {
    // On component mount, get the data from local storage
    const localData = localStorage.getItem("todayWorkoutData");
    if (localData) {
      setTodayWorkoutData(JSON.parse(localData));
    }
  }, []);

  useEffect(() => {
    // Every time todayWorkoutData changes, save it to local storage
    if (todayWorkoutData) {
      localStorage.setItem("todayWorkoutData", JSON.stringify(todayWorkoutData));
    }
  }, [todayWorkoutData]);

  const handleFinish = async () => {
    try {
      // Use todayWorkoutData for Firestore
      const exercisesLog = todayWorkoutData.TodaysExercises.map((exercise) => {
        return {
          exerciseName: exercise.exerciseName,
          exerciseId: exercise.exerciseId,
          sets: exercise.sets,
        };
      });
  
      const workoutLogData = {
        WorkoutTemplate: userData.currentWorkoutTemplate,
        dayIdx: todayWorkoutData.dayIdx,
        user: userData.uid,
        date: new Date().toISOString(),
        timeStarted: null,
        timeFinished: new Date().toISOString(),
        exercises: exercisesLog,
      };
      console.log("Writing to DB workoutLogData:", workoutLogData);
      // Push to Firestore
      const docRef = await addDoc(
        collection(db, "workoutLogs"),
        workoutLogData
      );

      console.log("Document written with ID: ", docRef.id);
      setTodayWorkoutData(null);
      localStorage.removeItem('todayWorkoutData');

      enqueueSnackbar('Workout logged successfully!', { variant: 'success' });
  } catch (error) {
      enqueueSnackbar('There was a problem submitting your workout.', { variant: 'error' });
  }
  };

  if (loading) {
    return (
      <p>
        <CircularIndeterminate />
      </p>
    );
  }
  console.log("userData:", userData);
  console.log("lastWorkoutLog:", lastWorkoutLog);
  console.log("todayWorkoutData:", todayWorkoutData);

  if (loading) {
    return (
      <p>
        <LinearIndeterminate />
      </p>
    );
  }

  return (
    <div
      style={{ maxWidth: "460px", margin: "0 auto", padding: theme.spacing(2) }}
    >
      <Typography
        variant="h2"
        gutterBottom
        style={{ fontWeight: 600, textAlign: "center" }}
      >
        Program: {todayWorkoutData.programName}
      </Typography>

      {/* Section 1: Last Workout */}
      {lastWorkoutLog && (
        <Paper
          style={{ padding: theme.spacing(2), marginBottom: theme.spacing(3) }}
        >
          <Typography variant="h5" gutterBottom>
            Last Workout: {lastWorkoutLog.day}
          </Typography>
          {todayWorkoutData.TodaysExercises.map((exercise, exerciseIndex) => (
            <Paper
              key={exerciseIndex}
              style={{ margin: theme.spacing(2, 0), padding: theme.spacing(2) }}
            >
              <Typography variant="h6" gutterBottom>
                {exercise.exerciseName}
              </Typography>
              {exercise.sets.map((set, setIndex) => (
                <Typography key={setIndex}>
                  Set {setIndex + 1}: {set.weight} Kg x {set.reps} reps
                </Typography>
              ))}
            </Paper>
          ))}
        </Paper>
      )}

    {/* Section 2: Today's Workout Input Fields */}
    {todayWorkoutData && (
      <DayLevelStyle>
        <Typography>Today's Workout: {todayWorkoutData.dayName}</Typography>

        <ExerLevelStyle>
          {todayWorkoutData.TodaysExercises.map((exercise, exerciseIndex) => (
            <React.Fragment key={exerciseIndex}>
              <Typography>Ex {exerciseIndex + 1}: {exercise.exerciseName}</Typography>

              {exercise.sets.map((set, index) => (
                <SetLevelStyle key={index}>
                  <div>
                    Set {index + 1}:
                      {exercise &&
                        exerciseList[exercise.exerciseId].weighted && (
                          <>
                            <CustomTextField
                              type="number"
                              inputProps={{ step: "0.5", min: "0", max: "999" }}
                              value={set.weight}
                              onChange={(e) =>
                                handleInputChange(
                                  index,
                                  "weight",
                                  e.target.value
                                )
                              }
                            />{" "}
                            Kg
                          </>
                        )}
                      {exercise && exerciseList[exercise.exerciseId].reps && (
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
                      {exercise && exerciseList[exercise.exerciseId].timed && (
                        <>
                          {" "}
                          For{" "}
                          <CustomTextField
                            type="number"
                            inputProps={{ min: "0", max: "59" }}
                            placeholder="00"
                            value={Math.floor((set.time || 0) / 60)}
                            onChange={(e) => {
                              const minutesValue =
                                parseInt(e.target.value, 10) || 0;
                              const currentSeconds = set.time % 60;
                              updateTime(index, minutesValue, currentSeconds);
                            }}
                          />{" "}
                          min{" "}
                          <CustomTextField
                            type="number"
                            inputProps={{ min: "0", max: "59" }}
                            placeholder="30"
                            value={(set.time || 0) % 60}
                            onChange={(e) => {
                              const secondsValue =
                                parseInt(e.target.value, 10) || 0;
                              const currentMinutes = Math.floor(set.time / 60);
                              updateTime(index, currentMinutes, secondsValue);
                            }}
                          />{" "}
                          sec
                        </>
                      )}
                    </div>
                </SetLevelStyle>
              ))}
            </React.Fragment>
          ))}
        </ExerLevelStyle>

        <Button variant="contained" color="primary" onClick={handleFinish}>
          Finish Workout
        </Button>
      </DayLevelStyle>
    )}

      <Grid container spacing={2} style={{ marginTop: theme.spacing(4) }}>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default WorkoutView;
