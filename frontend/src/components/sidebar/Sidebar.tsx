import React, { FC, ReactElement } from "react";
import { Profile } from "../profile/Profile";
import { StyledGrid }  from "./styled";
import { CreateTaskForm } from "../createTaskForm/CreateTaskForm";
import LanguageSelector from "../languageSelector/language";

export const Sidebar: FC = (): ReactElement => {
  return (
    <StyledGrid item md={4}>
      <LanguageSelector />
      <Profile name={'Bianca'}/>
      <CreateTaskForm />
    </StyledGrid>
  )
}