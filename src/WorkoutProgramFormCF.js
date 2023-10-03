import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  ListItem,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function WorkoutProgramFormCF() {
  return (
    <div>
      <Paper elevation={5} style={{ marginBottom: "1rem" }}>
      <Typography variant="h4">Program : Bro Split</Typography>

      {/* Chest Day Accordion */}
      <Paper elevation={3} style={{ marginBottom: "1rem" }}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Chest Day</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {/* Bench Press Accordion */}
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Bench Press</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                <Paper elevation={2} style={{ marginBottom: '8px' }}>
                  <ListItem>Set 1 : 50Kg X 20 reps</ListItem>
                  </Paper>
                  <Paper elevation={2} style={{ marginBottom: '8px' }}>
                  <ListItem>Set 2 : 50Kg X 20 reps</ListItem>
                  </Paper>
                  <Paper elevation={2} style={{ marginBottom: '8px' }}>
                  <ListItem>Set 3 : 50Kg X 20 reps</ListItem>
                  </Paper>
                </List>
              </AccordionDetails>
            </Accordion>
            {/* Bench Press Accordion */}
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Dumbell Flyes</Typography>
              </AccordionSummary>
              <AccordionDetails>
              <Paper elevation={2} style={{ padding: '1rem' }}>
                <List>
                  <ListItem>Set 1 : 10Kg X 20 reps</ListItem>
                  <ListItem>Set 2 : 10Kg X 20 reps</ListItem>
                  <ListItem>Set 3 : 10Kg X 20 reps</ListItem>
                </List>
                </Paper>
              </AccordionDetails>
            </Accordion>
            {/* Add more exercises similarly */}
          </AccordionDetails>
        </Accordion>
      </Paper>
      {/* Shoulder Day Accordion */}
      <Paper elevation={3} style={{ marginBottom: '1rem', padding: '1rem' }}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Shoulder Day</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {/* Front Raise Press Accordion */}
            <Paper elevation={6} style={{ marginBottom: '0.5rem', padding: '0.75rem' }}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Front Raise</Typography>
              </AccordionSummary>
              <AccordionDetails>
              <Paper elevation={2} style={{ padding: '0.5rem' }}>
                <List>
                <Paper elevation={1} style={{ marginBottom: '0.25rem', padding: '0.5rem' }}>
                  <ListItem>Set 1 : 5Kg X 20 reps</ListItem>
                  </Paper>
                  <Paper elevation={1} style={{ marginBottom: '0.25rem', padding: '0.5rem' }}>
                  <ListItem>Set 2 : 5Kg X 20 reps</ListItem>
                  </Paper>
                  <Paper elevation={1} style={{ marginBottom: '0.25rem', padding: '0.5rem' }}>
                  <ListItem>Set 3 : 5Kg X 20 reps</ListItem>
                </Paper>
                </List>
                </Paper>
              </AccordionDetails>
            </Accordion>
            </Paper>
            {/* Lateral Raise Accordion */}
            <Paper elevation={6} style={{ marginBottom: '0.5rem', padding: '0.75rem' }}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Lateral Raise</Typography>
              </AccordionSummary>
              <AccordionDetails>
              <Paper elevation={2} style={{ padding: '0.5rem' }}>
                <List>
                <Paper elevation={1} style={{ marginBottom: '0.25rem', padding: '0.5rem' }}>
                  <ListItem>Set 1 : 7Kg X 20 reps</ListItem>
                  </Paper>
                  <Paper elevation={1} style={{ marginBottom: '0.25rem', padding: '0.5rem' }}>
                  <ListItem>Set 2 : 8Kg X 20 reps</ListItem>
                  </Paper>
                  <Paper elevation={1} style={{ marginBottom: '0.25rem', padding: '0.5rem' }}>
                  <ListItem>Set 3 : 10Kg X 20 reps</ListItem>
                </Paper>
                </List>
                </Paper>
              </AccordionDetails>
            </Accordion>
            </Paper>
            {/* Add more exercises similarly */}
          </AccordionDetails>
        </Accordion>
      </Paper>
      {/* You can add more day accordions similarly */}
      </Paper>
    </div>
  );
}

export default WorkoutProgramFormCF;
