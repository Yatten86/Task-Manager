import { ITaskApi } from "../interfaces/ITaskApi"
import { TaskCounterStatusType } from "../../taskcounter/interfaces/ITaskCounter"

export const countTasks = (
    tasks: ITaskApi[], 
    status: TaskCounterStatusType,
): number => {
    if (!Array.isArray(tasks)) {
        return 0;
    }

    const totalTasks = tasks.filter((tasks) => {
        return tasks.status === status;
    })

    return totalTasks.length;
}