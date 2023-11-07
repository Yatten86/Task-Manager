import React, { FC, ReactElement, useEffect, useState, useContext } from "react";
import { StyledBox, StyledTypography } from "./styled";
import { Button, Alert, AlertTitle, LinearProgress }  from '@mui/material';
import { TaskTitleField } from "./_TaskTitleField";
import { TaskDescriptionField } from "./_TaskDescriptionField";
import { Stack } from "@mui/material";
import { TaskDateField } from "./_TaskDateField";
import { TaskSelectField } from "./_TaskSelectField";
import { Status } from "./enums/Status";
import { Priority} from "./enums/Priority";
import { useMutation } from '@tanstack/react-query'
import { sendApiReq } from "../../helpers/sendApiReq";
import { ICreateTask } from "../taskarea/interfaces/ICreateTask";
import { TaskStatusChangedContext } from "../../context";
import { useTranslation } from "react-i18next";


export const CreateTaskForm: FC = (): ReactElement => {

const { t } = useTranslation();

const [title, setTitle] = useState<string | undefined>(undefined);
const [description, setDescription] = useState<string | undefined>(undefined);
const [date, setDate] = useState<Date | null>(new Date);
const [status, setStatus] = useState<string>(Status.todo);
const [priority, setPriority] = useState<string>(Priority.normal);
const [showSuccess, setShowSuccess] = useState<boolean>(false) 

const taskUpdatedContext = useContext(TaskStatusChangedContext);

//create task mutation
const createTaskMutation = useMutation({
  mutationFn: (data: ICreateTask) => sendApiReq(
    'http://localhost:3200/tasks',
    'POST',
    data
  )
})



function createTaskHandler() {
  if(!title || !date || !description) {
    return;
  }

  const task: ICreateTask = {
    title,
    description,
    date: date.toString(),
    status,
    priority
  };

  createTaskMutation.mutate(task)
}

useEffect(() => {
  if (createTaskMutation.isSuccess) {
    setShowSuccess(true);
    taskUpdatedContext.toggle();

    setTitle('');
    setDescription('');
    setDate(new Date());
    setStatus(Status.todo);
    setPriority(Priority.normal);

    console.log('Form reset'); // Add this line
  }

  const successTimeout = setTimeout(() => {
    setShowSuccess(false)
  }, 1500)

  return () => {
    clearTimeout (successTimeout);
  }
}, [createTaskMutation.isSuccess])

  return (
    <StyledBox px={4} my={6}>    
      {showSuccess &&
      <Alert
        severity="success"
        sx={{width: '100%', marginBottom: '16px'}}  
      >
        <AlertTitle>{t('success.title')}</AlertTitle>
        {t('success.message')}
      </Alert>}
      <StyledTypography>
        {t('createTask')}
      </StyledTypography>

      <Stack sx={{width: '100%', marginTop:'8px'}} spacing={2}>
        <TaskTitleField 
          disabled={
            createTaskMutation.isPending
          }
            onChange={(e) => setTitle(e.target.value)}
        />
        <TaskDescriptionField
          disabled={
            createTaskMutation.isPending
          } 
            onChange={(e) => setDescription(e.target.value)}
        />
        <TaskDateField 
          disabled={
            createTaskMutation.isPending
          }
            value={date}
            onChange={(e) => setDate(date)}
        />
        <Stack direction={'row'} spacing={2}>
          <TaskSelectField
            disabled={
              createTaskMutation.isPending
            }
              label={t('task.status')} 
              name={'status'}
              value={status}
              onChange={(e) => setStatus(e.target.value as string)}
              items={[
                {
                  value: Status.todo,
                  label: t('todo')
                },
                {
                  value: Status.inProgress,
                  label: t('inProgress')
                },
            ]}
          />
          <TaskSelectField
            disabled={
              createTaskMutation.isPending
            }
            label={t('task.priority')}
            name={'priority'}
            value={priority}
            onChange={(e) => setPriority(e.target.value as string)}
            items={[
              {
                value: Priority.high,
                label: t('high')
              },
              {
                value: Priority.normal,
                label: t('normal')
              },
              {
                value: Priority.low,
                label: t('low'),
              },
            ]}
          />
        </Stack>
        {createTaskMutation.isPending && <LinearProgress/>}
        <Button 
          disabled = {
            !title || !description || !date || !status || !priority
          }
          onClick={createTaskHandler}
          variant="contained" size="large" fullWidth>
          Create a Task
        </Button>
      </Stack>
    </StyledBox>
  )
}