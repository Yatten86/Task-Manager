import { Avatar, Box, styled } from "@mui/material";

const StyledBox = styled(Box) ((theme) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}))

const StyledAvatar = styled(Avatar) ((theme) => ({
  backgroundColor: 'transparent',
  border: '5px solid',
  width: '96px',
  height: '96px',
  marginBottom: '16px',
}))

export {
  StyledBox,
  StyledAvatar
}