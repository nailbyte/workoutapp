import React, { useState } from 'react';
import { Button, Container, TextField, Typography, Grid, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';

const WorkoutProgramForm = () => {
    const [programName, setProgramName] = useState('');
    const [description, setDescription] = useState('');
    const [frequency, setFrequency] = useState('');
    const [hasProgression, setHasProgression] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission
    };

    return (
        <Container maxWidth="xs">
            <Typography variant="h4" align="center" gutterBottom>
                New Workout Program
            </Typography>
            
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            label="Program Name"
                            value={programName}
                            onChange={e => setProgramName(e.target.value)}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            multiline
                            rows={4}
                            label="Description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            label="Frequency (e.g. 6 days a week)"
                            value={frequency}
                            onChange={e => setFrequency(e.target.value)}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Has Progression?</FormLabel>
                            <RadioGroup
                                row
                                value={hasProgression}
                                onChange={e => setHasProgression(e.target.value)}
                            >
                                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                <FormControlLabel value="no" control={<Radio />} label="No" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    {/* For exercises, days, and other detailed inputs, you can add further steps or form fields here. */}

                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" type="submit" fullWidth>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default WorkoutProgramForm;
