import { TaskStatusEnum } from '@/models/task-model'

export const TaskStatusDescriptions: Record<TaskStatusEnum, string> = {
    [TaskStatusEnum.NEW]: 'New',
    [TaskStatusEnum.IN_PROGRESS]: 'In progress',
    [TaskStatusEnum.COMPLITED]: 'Complited',
}

export enum ModalTaskEnum {
    NEW = 'new',
    EDIT = 'edit'
}
export type ModalTaskType = ModalTaskEnum.NEW | ModalTaskEnum.EDIT