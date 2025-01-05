import { TaskStatusEnum } from '@/models/task-model'

export const TaskStatusDescriptions: Record<TaskStatusEnum, string> = {
    [TaskStatusEnum.NEW]: 'Новый',
    [TaskStatusEnum.IN_PROGRESS]: 'В процессе',
    [TaskStatusEnum.COMPLITED]: 'Завершён',
}

export enum ModalTaskEnum {
    NEW = 'new',
    EDIT = 'edit'
}
export type ModalTaskType = ModalTaskEnum.NEW | ModalTaskEnum.EDIT