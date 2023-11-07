import React, { FC, ReactElement, useContext, useEffect } from "react";
import { StyledBox, StyledGrid, TaskStatusGrid  } from "./styled";
import { format } from 'date-fns';
import { ro, enUS, srLatn } from "date-fns/locale";
import { Grid, Alert, LinearProgress} from "@mui/material";
import { TaskCounter } from "../taskcounter/TaskCounter";
import { Task } from "../task/Task";
import { useQuery, useMutation } from "@tanstack/react-query";
import { sendApiReq } from "../../helpers/sendApiReq";
import { ITaskApi } from "./interfaces/ITaskApi";
import { Status } from "../createTaskForm/enums/Status";
import { IUpdateTask } from "../createTaskForm/interfaces/IUpdateTask";
import { countTasks } from "./helpers/countTasks";
import { TaskStatusChangedContext } from "../../context";
import { useTranslation } from "react-i18next";
import { LocaleMap } from "./interfaces/ILocaleMap";



export const TaskArea: FC = (): ReactElement => {

  const { t, i18n } = useTranslation();

  const localeMap: LocaleMap = {
    en: enUS,
    ro: ro,
    sr: srLatn
  }

  const dateLocale = localeMap[i18n.language] || enUS;
  
 

  const taskUpdatedContext = useContext(TaskStatusChangedContext);
  
  const queryKey = ['tasks'];

  const { error, isLoading, data, refetch } = useQuery(
    {
      queryKey,
      queryFn: async () => {
        return await sendApiReq<ITaskApi[]>(
          'http://localhost:3200/tasks',
          'GET',
        );
      },
    },
  );

  //update task mutation
  const updateTaskMutation = useMutation({
    mutationFn: (data: IUpdateTask) => sendApiReq(
      'http://localhost:3200/tasks',
      'PUT',
      data,
    )}
  );

  useEffect(() =>{
    refetch();
  }, [taskUpdatedContext.updated])

  useEffect(() => {
    if (updateTaskMutation.isSuccess) {
      taskUpdatedContext.toggle();
    }
  }, [updateTaskMutation.isSuccess])

  function onStatusChangeHandler (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string,
  ) {
    updateTaskMutation.mutate({
      id,
      status: e.target.checked ? Status.inProgress : Status.todo,
    })
  }

  function markCompleteHandler (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLAnchorElement>,
      id: string,
  ) {
    updateTaskMutation.mutate({
      id,
      status: Status.completed,}
    )
  }
  
  return(
    <StyledGrid item md={8} px={4}>

      <StyledBox mb={8} px={4}>
        <h2>
          {t('status.asOn')}
          {format(new Date(), 'PPPP', { locale: dateLocale})}
        </h2>
      </StyledBox>
      <TaskStatusGrid container>
        <Grid
          item
          display={'flex'}
          flexDirection={'row'}
          justifyContent={'space-around'}
          alignItems={'center'}
          md={10}
          xs={12}
          mb={8}
        >          
          <TaskCounter 
            status={Status.todo}
            count={
              data ? countTasks(data, Status.todo) : undefined
            }
          />
          <TaskCounter 
            status={Status.inProgress}
            count={
              data ? countTasks(data, Status.inProgress) : undefined
            }  
          />
          <TaskCounter 
            status={Status.completed}
            count={
              data ? countTasks(data, Status.completed) : undefined
            }
          />
        </Grid>
        <Grid
          item
          display={'flex'}
          flexDirection={'column'}
          xs={10}
          md={8}
        >
          <>
            {error && (
              <Alert severity="error">
              There was an error fetching your task
            </Alert>
            )}

            {!error && Array.isArray(data) && data.length === 0 && (
              <Alert>
                You have o no tasks created yet. Start by creating some tasks.
              </Alert>
            )}
          
            {isLoading ? (
                <LinearProgress/>
              ) : (
                Array.isArray(data) && data.length > 0 && data.map(
                  (each, index) => {
                    return each.status === Status.todo || 
                    each.status === Status.inProgress ? ( 
                      <Task 
                        key={index + each.priority}
                        id={each.id}
                        title={each.title}
                        date={new Date(each.date)}
                        description={each.description}
                        priority={each.priority}
                        status={each.status}
                        onStatusChange={onStatusChangeHandler}
                        onClick={markCompleteHandler}
                      />
                    ) : (false);
                  })              
              )}
            </>
        </Grid>
      </TaskStatusGrid>
    </StyledGrid>

  );
}