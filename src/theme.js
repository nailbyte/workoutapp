import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        size: "small",
        //blurOnEnter: true,
      },
      styleOverrides: {
        root: {
          margin: '0.5rem 0',
          '& .MuiInputBase-root': {
            //padding: '12px 16px',
            padding: '1px 1px',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          margin: '0.5rem 0',
          //padding: '12px 16px', // Adjust this as needed
          padding: '1px 1px', 
          
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          padding: '0.5rem', // Spacing inside the outline input
        },
        notchedOutline: {
          borderRadius: '8px', // if you want to give rounded corners to your inputs
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#0A74DA', // A vibrant shade of blue
    },
    secondary: {
      main: '#E53935', // A strong red for actions or highlights
    },
    background: {
      default: '#F6F6F6', // A light gray background to reduce glare and ensure contrast
    },
    text: {
      primary: '#333333', // Darker text for better readability
      secondary: '#555555', // Slightly lighter, for less important info
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.3,
    },
    h2: {
      fontWeight: 500,
      fontSize: '1.75rem',
      lineHeight: 1.3,
    },
    h3: {
      fontWeight: 500,
      fontSize: '1.5rem',
    },
    h4: {
      fontWeight: 500,
      fontSize: '1.25rem',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1rem',
    },
    h6: {
      fontWeight: 500,
      fontSize: '0.875rem',
    },
    body1: {
      fontSize: '1rem', // A slightly larger body text for easy reading
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
  },
  spacing: 4,
  shape: {
    borderRadius: 8, // A bit rounded, but not too much, to keep things modern
  },
});

export default theme;
