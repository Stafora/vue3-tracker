import { BaseModel } from './base-model';

const TABLE_NAME = 'tasks';

export enum TaskStatusEnum {
    NEW = 'new',
    IN_PROGRESS = 'in-progress',
    COMPLITED = 'complited'
}
export type TaskStatusType = TaskStatusEnum.NEW | TaskStatusEnum.IN_PROGRESS | TaskStatusEnum.COMPLITED

export interface CreateTaskInterface {
    title: string;
    description: string;
    status: TaskStatusType;
    expirationDate: Date;
    dateCreated: Date;
}
export interface TaskInterface extends CreateTaskInterface{
    id: IDBValidKey;
}
export type UpdateTaskInterface = Omit<TaskInterface, 'dateCreated'>;

class TaskModel extends BaseModel<CreateTaskInterface, UpdateTaskInterface, TaskInterface> {
    constructor() {
        super(TABLE_NAME);
    }
}

export const taskModel = new TaskModel()