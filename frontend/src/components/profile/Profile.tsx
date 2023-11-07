import React, { FC, ReactElement } from "react";
import { Typography } from "@mui/material";
import { StyledAvatar, StyledBox } from "./styled";
import { useTranslation } from "react-i18next"

import PropTypes from "prop-types";

interface IProfile {
  name?: string;
}

export const Profile: FC<IProfile> = (props): ReactElement => {
  const { t } = useTranslation();

  //  Destructure props
  const { name = 'Catalin'} = props;
  return (
    <StyledBox>
      <StyledAvatar>
        <Typography variant={'h4'} color={'text.primary'}>
          {`${name.substring(0,1)}`} { /* extracts first letter of the name */ }
        </Typography>
      </StyledAvatar>

      <Typography variant={'h6'} color={'text.primary'}>
      {t('welcome', { name })}
      </Typography>

      <Typography variant={'body1'} color={'text.primary'}>
        {t('task.manager')}
      </Typography>
    </StyledBox>
  )
}

Profile.propTypes = {
  name: PropTypes.string.isRequired,
};