import React, { useEffect, useRef } from 'react';
import { Paper, Typography, useTheme } from "@mui/material";
import { ConversationalForm } from 'conversational-form';

const WorkoutProgramFormCF = () => {
    const theme = useTheme();

    const formFields = [
        {
            'tag': 'input',
            'type': 'text',
            'name': 'firstname',
            'cf-questions': 'What is your firstname?'
        },
        {
            'tag': 'input',
            'type': 'text',
            'name': 'lastname',
            'cf-questions': 'What is your lastname?'
        }
    ];

    const elemRef = useRef(null);
    const cf = useRef(null);

    useEffect(() => {
        cf.current = ConversationalForm.startTheConversation({
            options: {
                submitCallback: submitCallback,
                preventAutoFocus: true,
                // loadExternalStyleSheet: false
            },
            tags: formFields
        });
        elemRef.current.appendChild(cf.current.el);
        // Cleanup when the component is unmounted
        return () => {
            if (cf.current && cf.current.el && cf.current.el.parentNode) {
                cf.current.el.parentNode.removeChild(cf.current.el);
            }
        };
    }, []); // Empty dependency array ensures the effect runs only once, similar to componentDidMount

    const submitCallback = () => {
        const formDataSerialized = cf.current.getFormData(true);
        console.log("Formdata, obj:", formDataSerialized);
        cf.current.addRobotChatResponse("You are done. Check the dev console for form data output.");
    };

    return (
        <div style={{ maxWidth: '460px', margin: '20px auto', padding: theme.spacing(2), backgroundColor: 'lightgray' }}>
            <Typography variant="h5" align="center" gutterBottom>
                Conversational Form
            </Typography>
            <Paper elevation={3} style={{ padding: theme.spacing(2) }}>
                <div ref={elemRef} style={{ width: '100%', height: '400px' }} />
            </Paper>
        </div>
    );
    
    // return (
    //     <div style={{ width: '100%', height: '400px' }}>
    //         <div ref={elemRef} style={{ width: '100%', height: '100%' }} />
    //     </div>
    // );
    
    // return (
    //     <div>
    //         <div ref={elemRef} />
    //     </div>
    // );
}

export default WorkoutProgramFormCF;
