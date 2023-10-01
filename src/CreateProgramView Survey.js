/*import React, { useState, useEffect } from "react";
import * as Survey from 'survey-react';
import { useTheme } from '@mui/material/styles';
import { TextField, Grid, Typography, Button, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DoneIcon from '@mui/icons-material/Done';

// Styles
import 'survey-react/survey.css';

const CreateProgramView = () => {
    const theme = useTheme();

    const initialSurveyJSON = {
        questions: [
            {
                type: "text",
                name: "programName",
                title: "Program Name?"
            },
            {
                type: "dropdown",
                name: "daysPerWeek",
                title: "How many days a week?",
                choices: [1, 2, 3, 4, 5, 6, 7]
            },
            {
                type: "paneldynamic",
                name: "days",
                title: "Days",
                templateTitle: "Day {panelIndex}",
                panelCount: 1,  // This will be set dynamically based on "daysPerWeek" in real scenarios
                panelAddText: "Add Day",
                panelRemoveText: "Remove Day",
                templateElements: [
                    {
                        type: "dropdown",
                        name: "exercise",
                        title: "Pick an exercise",
                        choices: ["Exercise 1", "Exercise 2", "Custom..."] // You can populate this from your "list of exercises"
                    },
                    {
                        type: "matrixdynamic",
                        name: "sets",
                        title: "Sets for the exercise",
                        columns: [
                            {
                                name: "reps",
                                title: "Reps",
                                cellType: "text",
                            },
                            {
                                name: "weight",
                                title: "Weight",
                                cellType: "text",
                            }
                        ],
                        rowCount: 1,
                        addRowText: "Add set",
                        removeRowText: "Remove set"
                    }
                ]
            }
        ]
    };

    const [survey, setSurvey] = useState(new Survey.Model(initialSurveyJSON));
    useEffect(() => {
        const savedData = localStorage.getItem('surveyData');
        if (savedData) {
            setSurvey(new Survey.Model(JSON.parse(savedData)));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('surveyData', JSON.stringify(survey.toJSON()));
    }, [survey]);

    const onValueChanged = (result) => {
        if (result.name === "daysPerWeek") {
            let daysQuestion = survey.getQuestionByName("days");
            daysQuestion.panelCount = result.value;
            daysQuestion.minPanelCount = result.value;
            setSurvey(survey);
        }
    };

    const onComplete = (result) => {
        console.log("Completed", result.data);
    };

    return (
        <div style={{ maxWidth: "460px", margin: "0 auto", padding: theme.spacing(2) }}>
            <Survey.Survey
                model={survey}
                onValueChanged={onValueChanged}
                onComplete={onComplete}
            />
        </div>
    );

}

export default CreateProgramView;
*/