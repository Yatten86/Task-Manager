import { TaskCounterStatusType} from "../interfaces/ITaskCounter";
import { Status} from "../../createTaskForm/enums/Status";

export const correctLableName =(status: TaskCounterStatusType): string => {
  switch (status) {
    case Status.todo:
      return `Todo's`;
    case Status.inProgress:
      return 'In progress';
    case Status.completed:
      return 'Completed'
  }
}