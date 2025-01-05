export interface IndexDBHelperInterface {
    getAll<T>(): Promise<T[]>;
    getById<T>(id: IDBValidKey): Promise<T | null>
    add<TInput, TOutput>(data: TInput): Promise<TOutput>;
    addMultipleData<T>(data: T[]): Promise<void>;
    update<TInput, TOutput>(data: TInput): Promise<TOutput>;
    delete(id: IDBValidKey): Promise<IDBValidKey>;
}

type TablesType = {
    [k: string]: string
}

class IndexDBHelper implements IndexDBHelperInterface {
    private dbName: string;
    private currentTable: string;
    private db: IDBDatabase | null = null;
    public tables: TablesType = {};

    constructor(currentTable: string) {
        this.dbName = 'task-db';
        this.currentTable = currentTable;

        this.tables = {
            sortAtWork: 'tasks'
        }
    }

    private openDB(): Promise<any> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, 1);

            request.onupgradeneeded = () => {
                const db = request.result;

                Array.from(db.objectStoreNames).forEach((storeName) => {
                    if (!Object.values(this.tables).includes(storeName)) {
                        db.deleteObjectStore(storeName);
                    }
                });

                Object.values(this.tables).forEach((value) => {
                    if (!db.objectStoreNames.contains(value)) {
                        db.createObjectStore(value, { keyPath: 'id', autoIncrement: true });
                    }
                });
            };

            request.onsuccess = (e) => {
                this.db = (e.target as IDBRequest).result;
                resolve(this.db);
            };

            request.onerror = () => {
                reject(new Error('Failed to open database'));
            };
        });
    }

    public async getAll<T>(): Promise<T[]> {
        const db = await this.openDB();
        const transaction = db.transaction(this.currentTable, 'readonly');
        const store = transaction.objectStore(this.currentTable);
        const request = store.getAll();

        return new Promise<T[]>((resolve, reject) => {
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(new Error('Failed to get all data'));
        });
    }

    public async getById<T>(id: IDBValidKey): Promise<T | null> {
        const db = await this.openDB();
        const transaction = db.transaction(this.currentTable, 'readonly');
        const store = transaction.objectStore(this.currentTable);
        const request = store.get(id);
    
        return new Promise<T | null>((resolve, reject) => {
            request.onsuccess = () => resolve(request.result as T | null);
            request.onerror = () => reject(new Error(`Failed to get record with id: ${id}`));
        });
    }

    public async add<TInput, TOutput>(data: TInput): Promise<TOutput> {
        const db = await this.openDB();
        const transaction = db.transaction(this.currentTable, 'readwrite');
        const store = transaction.objectStore(this.currentTable);
    
        const key = await new Promise<IDBValidKey>((resolve, reject) => {
            const request = store.add(data);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(new Error('Failed to save data'));
        });
    
        const result = await new Promise<TOutput>((resolve, reject) => {
            const request = store.get(key);
            request.onsuccess = () => resolve(request.result as TOutput);
            request.onerror = () => reject(new Error('Failed to fetch saved data'));
        });

        return result;
    }

    public async update<TInput, TOutput>(data: TInput): Promise<TOutput> {
        const db = await this.openDB();
        const transaction = db.transaction(this.currentTable, 'readwrite');
        const store = transaction.objectStore(this.currentTable);

        const key = await new Promise<IDBValidKey>((resolve, reject) => {
            const request = store.put(data);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(new Error('Failed to save data'));
        });
    
        const result = await new Promise<TOutput>((resolve, reject) => {
            const request = store.get(key);
            request.onsuccess = () => resolve(request.result as TOutput);
            request.onerror = () => reject(new Error('Failed to fetch saved data'));
        });

        return result;
    }

    public async addMultipleData<T>(array: T[]): Promise<void> {
        const db = await this.openDB();
        const transaction = db.transaction(this.currentTable, 'readwrite');
        const store = transaction.objectStore(this.currentTable);

        const addPromises = array.map((item) => {
            return new Promise<void>((resolve, reject) => {
                const request = store.add(item);

                request.onsuccess = () => resolve();
                request.onerror = () => reject(new Error(`Failed to add item: ${JSON.stringify(item)}`));
            });
        });

        try {
            await Promise.all(addPromises);
        } catch (error) {
            console.error('Error adding items:', error);
        }
    }

    public async delete(id: IDBValidKey): Promise<IDBValidKey> {
        const db = await this.openDB();
        const transaction = db.transaction(this.currentTable, 'readwrite');
        const store = transaction.objectStore(this.currentTable);
        const request = store.delete(id);

        return await new Promise<IDBValidKey>((resolve, reject) => {
            request.onsuccess = () => resolve(id);
            request.onerror = () => reject(new Error('Failed to delete data'));
        });
    }
}

export default IndexDBHelper