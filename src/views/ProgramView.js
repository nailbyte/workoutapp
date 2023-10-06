import React, { useState, useContext, useEffect } from "react";

import {
  Button,
  Select,
  MenuItem,
  Typography,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DayComponent from "../components/CreateProgram/DayComponent";
import {
  ProgLevelStyle,
  DayLevelStyle,
  ExerLevelStyle,
  SetLevelStyle,
} from "../styles/LevelledStyle";
import { AuthContext } from "../components/AuthContext";
import { useSnackbar } from "notistack";
import { db } from "../firebase";
import {
  addDoc,
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";

import exerciseList from "../utils/ExerciseList";
import { useNavigate } from "react-router-dom";
import formatTime from "../utils/FormatTime";

import {
  LinearIndeterminate,
  CircularIndeterminate,
  CircularWithValueLabel,
} from "../components/common/LoadingComp";

import theme from './../theme';

const ProgramView = () => {
  
  const { enqueueSnackbar } = useSnackbar();
  const { user, handleLogout } = useContext(AuthContext);

  const [currentProgram, setCurrentProgram] = useState(null);
  const [userProgramsList, setUserProgramsList] = useState([]);
  const [selectedProgramIndex, setSelectedProgramIndex] = useState(-1);

  const [loading, setLoading] = useState(true); // Loading state
  const [alertOpen, setAlertOpen] = useState(false); // Snackbar state
  const [alertMessage, setAlertMessage] = useState(""); // Alert Message

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentProgramAndAllPrograms = async () => {
      if (!user) return;

      setLoading(true);
      const userDocRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userDocRef);

      if (userSnap.exists() && userSnap.data().currentWorkoutTemplate) {
        const programDocRef = doc(
          db,
          "workoutTemplates",
          userSnap.data().currentWorkoutTemplate
        );
        const programSnap = await getDoc(programDocRef);

        if (programSnap.exists()) {
          setCurrentProgram(programSnap.data());
        }

        const allUserProgramsSnapshot = await getDocs(
          query(
            collection(db, "workoutTemplates"),
            where("user", "==", user.uid),
            orderBy("modificationDate", "desc"),
            limit(20)
          )
        );

        const userProgramsList = allUserProgramsSnapshot.docs.map((doc) =>
          doc.data()
        );
        setUserProgramsList(userProgramsList);

        // Find the index of the currentProgram in userProgramsList
        const currentProgramIndex = userProgramsList.findIndex(
          (program) => program.programName === programSnap.data().programName
        );

        // Set the selectedProgramIndex to the found index, or -1 if not found
        setSelectedProgramIndex(
          currentProgramIndex !== -1 ? currentProgramIndex : -1
        );

        console.log("User programs list:", userProgramsList);
      }
      setLoading(false);
    };

    fetchCurrentProgramAndAllPrograms();
  }, [user, db]);

  const handleCreateNew = () => {
    navigate("/createprogramview");
    setSelectedProgramIndex(-1);
  };

  const handleProgramChange = (event) => {
    const selectedIndex = event.target.value;
    setSelectedProgramIndex(selectedIndex);

    if (selectedIndex >= 0) {
      setCurrentProgram(userProgramsList[selectedIndex]);
    }
  };

  const closeAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertOpen(false);
  };

  if (loading) {
    return (
      <p>
        <LinearIndeterminate />
      </p>
    );
    //return <p><CircularIndeterminate/></p>
    //return <p><CircularWithValueLabel/></p>
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
        Program Details
      </Typography>

      <FormControl fullWidth variant="outlined" style={{ margin: "20px 0" }}>
        <InputLabel>Choose Program</InputLabel>
        <Select
          value={selectedProgramIndex}
          onChange={handleProgramChange}
          label="Choose Program"
        >
          <MenuItem value={-1} onClick={handleCreateNew}>
            Create New
          </MenuItem>
          {userProgramsList.map((program, index) => (
            <MenuItem key={program.programName + "-" + index} value={index}>
              {program.programName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {currentProgram && (
        <DayLevelStyle>
          {currentProgram.allDaysExercises &&
          currentProgram.allDaysExercises.length > 0 ? (
            currentProgram.allDaysExercises.map((dayObj, dayIndex) => (
              <React.Fragment key={dayObj.dayName + "-" + dayIndex}>
                <Typography variant="h6">{dayObj.dayName}</Typography>
                <ExerLevelStyle>
                  {dayObj.exercises.map((exerciseObj, exerciseIndex) => (
                    <div key={exerciseObj.exerciseId + "-" + exerciseIndex}>
                      <Typography variant="body1">
                        {exerciseObj.exerciseName}
                      </Typography>
                      {exerciseObj.sets.map((set, index) => {
                        const exerciseDetail =
                          exerciseList[exerciseObj.exerciseId];
                        let setDetail = "";

                        // Check if exercise is weighted
                        if (exerciseDetail.weighted) {
                          setDetail += `${set.weight} kg `;
                        }

                        // Check if exercise has reps
                        if (exerciseDetail.reps) {
                          setDetail += `for ${set.reps} reps `;
                        }

                        // Check if exercise is timed
                        if (exerciseDetail.timed) {
                          setDetail += `for ${formatTime(set.time)}`;
                        }

                        return (
                          <Typography variant="body2" key={index}>
                            Set {index + 1}: {setDetail}
                          </Typography>
                        );
                      })}
                    </div>
                  ))}
                </ExerLevelStyle>
              </React.Fragment>
            ))
          ) : (
            <Typography variant="body1">
              No exercises for this program.
            </Typography>
          )}
        </DayLevelStyle>
      )}
    </div>
  );
};

export default ProgramView;
