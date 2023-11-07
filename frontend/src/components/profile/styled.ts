import Avatar from '@mui/material/Avatar';
import { Box, styled } from "@mui/material";

const StyledBox = styled(Box)(({theme}) =>({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));
const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: '96px',
  height: '96px',
  backgroundColor: 'primary.main',
  marginBottom: '16px'
}));


export {
  StyledBox,
  StyledAvatar
}