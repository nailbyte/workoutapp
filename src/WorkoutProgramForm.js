import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

import { Grid, Typography } from "@mui/material";
import { Table, TableBody, TableCell, TableRow, } from "@mui/material";
import CustomTextField from "./components/common/CustomTextField";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function WorkoutProgramForm() {
  return (
    <Accordion>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
    <Typography>More</Typography>
  </AccordionSummary>
    <AccordionDetails>
          <Table>
            {/* ... other table components like TableHead */}
            <TableBody>
              <TableRow>
                <TableCell>Set 1</TableCell>
                <TableCell>
                  <CustomTextField></CustomTextField>
                </TableCell>
                <TableCell>
                  <CustomTextField></CustomTextField>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Set 1</TableCell>
                <TableCell>
                  <CustomTextField></CustomTextField>
                </TableCell>
                <TableCell>
                  <CustomTextField></CustomTextField>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Set 1</TableCell>
                <TableCell>
                  <CustomTextField></CustomTextField>
                </TableCell>
                <TableCell>
                  <CustomTextField></CustomTextField>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          </AccordionDetails>
   </Accordion>
    

  );
}
export default WorkoutProgramForm;
