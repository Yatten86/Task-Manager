import React, { FC, ReactElement} from "react";
import PropTypes from "prop-types";
import { ITextField } from "./interfaces/ITextField";
import { StyledTextField } from "./styled";
import { useTranslation } from "react-i18next";


export const TaskDescriptionField: FC<ITextField> = (props): ReactElement => {
  const { t } = useTranslation();

  const {
    onChange= (e) => console.log(e) ,
    disabled = false} = props;

  return (
    <StyledTextField
      id={'title'}
      label={t('task.description')}
      variant={'outlined'}
      name={'title'}
      multiline
      rows={4}
      fullWidth
      onChange={onChange}
      disabled = {disabled}
    />
  );
};

TaskDescriptionField.propTypes = {
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};