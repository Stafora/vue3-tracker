import IndexDBHelper, { IndexDBHelperInterface } from '@/services/index-db-service'

export class BaseModel<TCreate, _TUpdate, TReturn> {
    private DB: IndexDBHelperInterface;

    constructor(private readonly tableName: string) {
        this.DB = new IndexDBHelper(tableName);
    }

    async add(data: TCreate): Promise<TReturn> {
        try {
            return await this.DB.add<TCreate, TReturn>(data);
        } catch (error) {
            console.error('Failed to add:', error);
            throw error;
        }
    }

    async addMultiply<TCreate>(arr: TCreate[]): Promise<void> {
        try {
            return await this.DB.addMultipleData<TCreate>(arr);
        } catch (error) {
            console.error('Failed to add:', error);
            throw error;
        }
    }

    async update<TUpdate>(data: TUpdate): Promise<TReturn> {
        try {
            return await this.DB.update<TUpdate, TReturn>(data);
        } catch (error) {
            console.error('Failed to update:', error);
            throw error;
        }
    }

    async getAll(): Promise<TReturn[]> {
        try {
            return await this.DB.getAll<TReturn>();
        } catch (error) {
            console.error('Failed to get all:', error);
            throw error;
        }
    }

    async getById(id: IDBValidKey): Promise<TReturn> {
        try {
            return await this.DB.getById<TReturn>(id);
        } catch (error) {
            console.error('Failed to getById:', error);
            throw error;
        }
    }

    async delete(id: IDBValidKey): Promise<IDBValidKey> {
        try {
            return await this.DB.delete(id);
        } catch (error) {
            console.error('Failed to delete:', error);
            throw error;
        }
    }
}