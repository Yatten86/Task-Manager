import { Grid, styled } from '@mui/material';


const StyledGrid = styled(Grid)(({theme}) => ({
  height: '100vh',
  position: 'fixed',
  right: 0,
  top: 0,
  width: '100%',
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
}))


export {
  StyledGrid,
}