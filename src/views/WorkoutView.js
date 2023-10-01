import React, { useState, useEffect, useContext, useCallback } from "react";
import { db } from "../firebase";
import { Paper, Button, Grid, Typography, TextField } from "@mui/material";
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
import { useTheme } from '@mui/material/styles';
import { useSnackbar } from 'notistack';

function WorkoutView() {
  console.log("WorkoutView rendered"); //TBD remove this

  const [userData, setUserData] = useState(null);
  const [lastWorkoutLog, setLastWorkoutLog] = useState(null);
  const [todayWorkoutData, setTodayWorkoutData] = useState(null);
  const { user, handleLogout } = useContext(AuthContext);

  const [workoutInputs, setWorkoutInputs] = useState({});
  const [loading, setLoading] = useState(true);

  const { enqueueSnackbar } = useSnackbar();

  const theme = useTheme();

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
      enqueueSnackbar('Failed to fetch user data. Please try again later.', { variant: 'error' });
      console.error("Error getting User details:", err);
    }
  }, [enqueueSnackbar, user, setUserData]);
  

  const fetchAndSetLastWorkoutLog = useCallback(async (fetchedUserData) => {
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
        setLastWorkoutLog(lastWorkoutLog);
        return lastWorkoutLog;
      }
      return null;
    } catch (err) {
      enqueueSnackbar('Failed to fetch workout logs. Please try again later.', { variant: 'error' });
      console.error("Trouble getting workout logs: ", err);
    }
  }, [enqueueSnackbar, setLastWorkoutLog]);
  

  const fetchAndSetTodayWorkoutData = useCallback(async (fetchedUserData, fetchedLastWorkoutLog) => {
    try {
      const workoutDocRef = doc(db, "workoutTemplates", fetchedUserData.currentWorkoutTemplate);
      const docSnap = await getDoc(workoutDocRef);
      if (docSnap.exists()) {
        const workoutTemplate = docSnap.data();
        const lastDay = fetchedLastWorkoutLog ? fetchedLastWorkoutLog.day : "Day0"
        const nextDayNumber =
          ((parseInt(lastDay.replace("Day", "")) + 1 - 1) %
            Object.keys(workoutTemplate.days).length) +
          1;
        const nextDay = `Day${nextDayNumber}`;
        const todayWorkoutData = {
          day: nextDay,
          programName: workoutTemplate.programName,
          exercises: workoutTemplate.days[nextDay]
        };
  
        setTodayWorkoutData(todayWorkoutData);
        return todayWorkoutData;
      } else {
        throw new Error("Workout template not found.");
      }
    } catch (err) {
      enqueueSnackbar('Failed to fetch Workout Program details. Please try again later.', { variant: 'error' });
      console.error("Error getting workout template:", err);
    }
  }, [enqueueSnackbar, setTodayWorkoutData]);


  useEffect(() => {
    if (user) {
      (async () => {
        try {
          const fetchedUserData = await fetchAndSetUserData();
          const fetchedLastWorkoutLog = await fetchAndSetLastWorkoutLog(fetchedUserData);
          await fetchAndSetTodayWorkoutData(fetchedUserData, fetchedLastWorkoutLog);
          enqueueSnackbar('Data loaded successfully.', { variant: 'success' });
        } catch (err) {
          enqueueSnackbar('Failed to load data. Please try again later.', { variant: 'error' });
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [user, enqueueSnackbar, fetchAndSetLastWorkoutLog, fetchAndSetTodayWorkoutData, fetchAndSetUserData]);
    

  // Function to handle input change
  const handleInputChange = (exercise, setIndex, type, value) => {
    const newInputs = { ...workoutInputs };
    if (!newInputs[exercise]) {
      newInputs[exercise] = [];
    }
    if (!newInputs[exercise][setIndex]) {
      newInputs[exercise][setIndex] = { weight: 0, reps: 0 };
    }
    newInputs[exercise][setIndex][type] = value;

    setWorkoutInputs(newInputs);

    // Store the data in localStorage
    localStorage.setItem("workoutInputs", JSON.stringify(newInputs));
  };
  // Fetch workoutInputs from localStorage on component mount
  useEffect(() => {
    const savedInputs = localStorage.getItem("workoutInputs");
    if (savedInputs) {
      setWorkoutInputs(JSON.parse(savedInputs));
    }
  }, []);

  const handleFinish = async () => {
    try {
      // Structure the data
      const workoutLogData = {
        WorkoutTemplate: userData.currentWorkoutTemplate, // Assuming you've stored user's current workout template in the user state
        day: todayWorkoutData.day,
        user: userData.uid, // user.uid,
        date: new Date().toISOString(),
        timeStarted: null, // Set this to the actual time when you implement the "Start Workout" feature
        timeFinished: new Date().toISOString(),
        exercises: workoutInputs,
      };

      // Push to Firestore
      const docRef = await addDoc(
        collection(db, "workoutLogs"),
        workoutLogData
      );

      console.log("Document written with ID: ", docRef.id);

      // Clear the workoutInputs state and the localStorage
      setWorkoutInputs({});
      localStorage.removeItem("workoutInputs");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  if (loading) {
    return <p>Loading...</p>;
 }
 console.log('userData:', userData);
 console.log('lastWorkoutLog:', lastWorkoutLog);
 console.log('todayWorkoutData:', todayWorkoutData); 
 
 return (
  <div style={{ maxWidth: "460px", margin: "0 auto", padding: theme.spacing(2) }}>
    <Typography variant="h2" gutterBottom style={{ fontWeight: 600, textAlign: 'center' }}>
      Program: {todayWorkoutData.programName}
    </Typography>
    
    {/* Section 1: Last Workout */}
    {lastWorkoutLog && (
      <Paper style={{ padding: theme.spacing(2), marginBottom: theme.spacing(3) }}>
        <Typography variant="h5" gutterBottom>
          Last Workout: {lastWorkoutLog.day}
        </Typography>
        {Object.entries(lastWorkoutLog.exercises).map(([exercise, sets]) => (
          <Paper key={exercise} style={{ margin: theme.spacing(2, 0), padding: theme.spacing(2) }}>
            <Typography variant="h6" gutterBottom>
              {exercise}
            </Typography>
            {sets.map((set, index) => (
              <Typography key={index}>
                Set {index + 1}: {set.weight} Kg x {set.reps} reps
              </Typography>
            ))}
          </Paper>
        ))}
      </Paper>
    )}

    {/* Section 2: Today's Workout Input Fields */}
    {todayWorkoutData && (
      <Paper style={{ padding: theme.spacing(2), marginBottom: theme.spacing(3) }}>
        <Typography variant="h5" gutterBottom>
          Today's Workout: {todayWorkoutData.day}
        </Typography>
        {Object.entries(todayWorkoutData.exercises).map(
          ([exercise, { sets, reps }]) => (
            <Paper key={exercise} style={{ margin: theme.spacing(2, 0), padding: theme.spacing(2) }}>
              <Typography variant="h6" gutterBottom>
                {exercise}
              </Typography>
              {[...Array(sets)].map((_, index) => (
                <Grid container key={index} alignItems="center" spacing={2} style={{ marginBottom: theme.spacing(1) }}>
                  <Grid item>
                    <Typography>Set {index + 1}</Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      label="weight"
                      variant="outlined"
                      value={
                        workoutInputs[exercise] &&
                        workoutInputs[exercise][index]
                          ? workoutInputs[exercise][index].weight
                          : ""
                      }
                      type="number"
                      inputProps={{
                          step: "0.5",
                          pattern: "^-?\\d*(\\.5)?$"
                      }}
                      onChange={(e) =>{
                        if (!e.target.validity.valid) {
                          e.preventDefault();
                          return;
                      }
                        handleInputChange(
                          exercise,
                          index,
                          "weight",
                          e.target.value
                        )
                        }
                      }
                      style={{ width: '80px' }} // width for 3-digit number
                      InputProps={{
                        style: { padding: '0px', fontSize: '1.1rem' }
                    }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography>Kg  x </Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      label="reps"
                      variant="outlined"
                      value={
                        workoutInputs[exercise] &&
                        workoutInputs[exercise][index]
                          ? workoutInputs[exercise][index].reps
                          : ""
                      }
                      type="number"
                      inputProps={{
                          step: "1",
                          min: "0"
                      }}
                      onChange={(e) =>{
                        if (!e.target.validity.valid) {
                          e.preventDefault();
                          return;
                      }              
                        handleInputChange(
                          exercise,
                          index,
                          "reps",
                          e.target.value
                        )
                      }
                      }
                      style={{ width: '70px' }} // width for 2-digit number
                      InputProps={{
                        style: { padding: '0px', fontSize: '1.1rem' }
                    }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography>reps</Typography>
                  </Grid>
                </Grid>
              ))}
              </Paper>
            )
          )}
          <Button variant="contained" color="primary" onClick={handleFinish}>
            Finish Workout
          </Button>
        </Paper>
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
