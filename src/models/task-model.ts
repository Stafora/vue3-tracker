import IndexDBHelper, { IndexDBHelperInterface } from '@/services/index-db-service'

export enum TaskStatusEnum {
    NEW = 'new',
    IN_PROGRESS = 'in-progress',
    COMPLITED = 'complited'
}
export type TaskStatusType = TaskStatusEnum.NEW | TaskStatusEnum.IN_PROGRESS | TaskStatusEnum.COMPLITED

export interface CreateTaskInterface {
    title: string,
    description: string
    status: string,
    expirationDate: string,
    dateCreated: Date
}
export interface TaskInterface extends CreateTaskInterface{
    id: IDBValidKey
}
export type UpdateTaskInterface = Omit<TaskInterface, 'dateCreated'>;

class TaskModel {
    private readonly tableName = 'tasks'
    private DB: IndexDBHelperInterface | null = null;

    constructor() {
        this.DB = new IndexDBHelper(this.tableName)
    }

    async add(data: CreateTaskInterface): Promise<TaskInterface> {
        return await this.DB.add<CreateTaskInterface, TaskInterface>(data)
    }

    async update(data: UpdateTaskInterface): Promise<TaskInterface> {
        return await this.DB.update<UpdateTaskInterface, TaskInterface>(data)
    }

    async getAll(): Promise<TaskInterface[]> {
        return await this.DB.getAll<TaskInterface>()
    }

    async getById(id: IDBValidKey): Promise<TaskInterface> {
        return await this.DB.getById<TaskInterface>(id)
    }

    async delete(id: IDBValidKey): Promise<IDBValidKey> {
        return await this.DB.delete(id)
    }
}

export const taskModel = new TaskModel()