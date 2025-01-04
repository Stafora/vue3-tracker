export type TaskCardType = {
    id: number,
    title: string,
    description: string,
    dateCreated: Date,
    expirationDate: Date,
    status: string
}

export enum TaskStatusEnum {
    NEW = 'new',
    IN_PROGRESS = 'in-progress',
    COMPLITED = 'complited'
}

export type TaskStatusType = TaskStatusEnum.NEW | TaskStatusEnum.IN_PROGRESS | TaskStatusEnum.COMPLITED;

export const TaskStatusDescriptions: Record<TaskStatusEnum, string> = {
    [TaskStatusEnum.NEW]: 'Новый',
    [TaskStatusEnum.IN_PROGRESS]: 'В процессе',
    [TaskStatusEnum.COMPLITED]: 'Завершён',
};