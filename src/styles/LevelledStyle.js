import { styled } from '@mui/system';
import Paper from '@mui/material/Paper';

const ProgLevelStyle = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  //backgroundColor: '#f7f7f7',
  '& .MuiButton-root, & .MuiTypography-root, & .MuiTextField-root, & .MuiInputLabel-root, & .MuiInputBase-input': {
    fontSize: '1.2rem',
  },
  '& .MuiButton-root': {
    padding: '14px 28px',
  }
}));

const DayLevelStyle = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1.5),
  //backgroundColor: '#fafafa',
  borderBottom: '1px solid' + theme.palette.grey[300],
  '& .MuiButton-root, & .MuiTypography-root, & .MuiTextField-root, & .MuiInputLabel-root, & .MuiInputBase-input': {
    fontSize: '1rem',
    fontWeight: 600,
  },
  '& .MuiButton-root': {
    padding: '12px 24px',
  }
}));

const ExerLevelStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
  //backgroundColor: '#fcfcfc',
  borderBottom: '1px dotted' + theme.palette.grey[200],
  '& .MuiButton-root, & .MuiTypography-root, & .MuiTextField-root, & .MuiInputLabel-root, & .MuiInputBase-input': {
    fontSize: '.85rem',
    fontWeight: 600,
  },
  '& .MuiButton-root': {
    padding: '10px 20px',
  },
  '& .MuiButton-root': {
    fontSize: '.75rem', // Adjust this for the desired font size
    padding: '4px 8px', // Adjust padding for the button size
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: '1px solid rgba(0, 0, 0, 0.1)', 
    
  },
}));

const SetLevelStyle = styled('div')(({ theme }) => ({
  padding: '0px 8px',
  //margin: '0px 0px 8px 0px',
  // padding: theme.spacing(0.5),
  //backgroundColor: 'white',
  borderTop: '1px dotted' + theme.palette.grey[100],
  '& .MuiButton-root, & .MuiTypography-root, & .MuiTextField-root, & .MuiInputLabel-root, & .MuiInputBase-input': {
    fontSize: '.8rem',
  },
  '& .MuiButton-root': {
    padding: '8px 16px',
  }
}));

export { ProgLevelStyle, DayLevelStyle, ExerLevelStyle, SetLevelStyle };
