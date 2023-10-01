import { TextField } from "@mui/material";

const CustomTextField = (props) => (
    <TextField
      sx={{
        margin: "0 4px",
        "& .MuiInputBase-input": {
          paddingTop: "0px",
          paddingBottom: "0px",
        },
      }}
      {...props} // spread the passed-in props
    />
  );
  
  export default CustomTextField; 