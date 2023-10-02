import { styled } from '@mui/system';
import Paper from '@mui/material/Paper';

const LevelOneStyle = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: '#f7f7f7',
  '& .MuiButton-root, & .MuiTypography-root, & .MuiTextField-root, & .MuiInputLabel-root, & .MuiInputBase-input': {
    fontSize: '1.2rem',
  },
  '& .MuiButton-root': {
    padding: '14px 28px',
  }
}));

const LevelTwoStyle = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1.5),
  backgroundColor: '#fafafa',
  borderBottom: '1px solid' + theme.palette.grey[300],
  '& .MuiButton-root, & .MuiTypography-root, & .MuiTextField-root, & .MuiInputLabel-root, & .MuiInputBase-input': {
    fontSize: '1rem',
  },
  '& .MuiButton-root': {
    padding: '12px 24px',
  }
}));

const LevelThreeStyle = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  backgroundColor: '#fcfcfc',
  borderBottom: '1px dotted' + theme.palette.grey[200],
  '& .MuiButton-root, & .MuiTypography-root, & .MuiTextField-root, & .MuiInputLabel-root, & .MuiInputBase-input': {
    fontSize: '0.85rem',
  },
  '& .MuiButton-root': {
    padding: '10px 20px',
  }
}));

const LevelFourStyle = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(0.5),
  backgroundColor: 'white',
  borderBottom: '1px dotted' + theme.palette.grey[100],
  '& .MuiButton-root, & .MuiTypography-root, & .MuiTextField-root, & .MuiInputLabel-root, & .MuiInputBase-input': {
    fontSize: '0.75rem',
  },
  '& .MuiButton-root': {
    padding: '8px 16px',
  }
}));

export { LevelOneStyle, LevelTwoStyle, LevelThreeStyle, LevelFourStyle };
