import React, { FC, ReactElement } from "react";
import { Typography } from "@mui/material";
import { StyledAvatar, StyledBox } from "./styled";

import { ITaskCounter } from "./interfaces/ITaskCounter";
import { Status } from "../createTaskForm/enums/Status"
import { correctBorderColor} from "./helpers/correctBorderColor";
import { correctLableName } from "./helpers/correctLableName";
import PropTypes from "prop-types";

export const TaskCounter: FC<ITaskCounter> = (props): ReactElement => {
  const { status = Status.inProgress, count = 0 } = props;

  return (
    <>
      <StyledBox>
        <StyledAvatar sx={{borderColor: `${correctBorderColor(status,)}`}}>
          <Typography color={'#ffffff'} variant={'h4'}>
            {count}
          </Typography>
        </StyledAvatar>
          <Typography
            color={'#ffffff'}
            fontWeight={'bold'}
            fontSize={'20px'}
            variant={'h5'}
          >
            {correctLableName(status)}
          </Typography>
      </StyledBox>
    </>
  )
}

TaskCounter.propTypes = {
  count: PropTypes.number,
  status: PropTypes.oneOf([
    Status.todo,
    Status.inProgress,
    Status.completed])
}