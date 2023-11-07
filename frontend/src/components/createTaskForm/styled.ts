import { Box, Typography, TextField, styled} from "@mui/material";


const StyledBox = styled(Box)(({theme}) =>({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '100%',
  marginTop: '10px',

}))

const StyledTypography = styled(Typography)(({theme}) =>({
  mb: 2,
  component: 'h2',
  variant: 'h6',
}))

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    border: '2px solid #000',
  },
  '& .MuiInputBase-input': {
    fontSize: '16px',
  },
  '& .MuiInputLabel-root': {
    color: 'primary.main',
  },
}));



export {
  StyledBox,
  StyledTypography,
  StyledTextField,
}