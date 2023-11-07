import { Box, Grid, styled } from "@mui/material";


const StyledGrid = styled(Grid)(({ theme }) => ({
  // marginBottom: 8,
  // padding: 4, here
}))

const StyledBox = styled(Box)((theme) => ({
  // marginBottom: 8,
  // padding: 4,

}))

const TaskStatusGrid = styled(Grid)((theme) => ({
  display: 'flex',
  justifyContent: 'center'
}))


export {
  StyledGrid,
  StyledBox,
  TaskStatusGrid
}