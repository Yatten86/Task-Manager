import React, { FC, ReactElement} from "react";
import { StyledTextField } from "./styled";
import PropTypes from "prop-types";
import { ITextField } from "./interfaces/ITextField";
import { useTranslation } from "react-i18next"

export const TaskTitleField: FC <ITextField> = (props): ReactElement => {
const { t } = useTranslation();

  const {
    onChange = (e) => console.log(e),
    disabled = false, } = props

  return (
    <StyledTextField
      id={'title'}
      label={t('task.title')}
      variant={'outlined'}
      fullWidth
      onChange={onChange}
      disabled={disabled}
    />
  );
};

TaskTitleField.propTypes = {
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};