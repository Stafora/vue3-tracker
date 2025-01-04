interface IndexDBHelperInterface {
    getAll(): Promise<any[]>;
    add(data: any): Promise<any>;
    addMultipleData(data: any[]): Promise<any>;
    update(data: any): Promise<void>;
    delete(id: IDBValidKey): Promise<void>;
}

type TablesType = {
    [k: string]: string
}

class IndexDBHelper implements IndexDBHelperInterface {
    private dbName: string;
    private storeName: string;
    private db: IDBDatabase | null = null;
    public tables: TablesType = {};

    constructor(storeName: string) {
        this.dbName = 'task-db';
        this.storeName = storeName;

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
                console.log(3)
                reject(new Error('Failed to open database'));
            };
        });
    }

    public async getAll(): Promise<any[]> {
        const db = await this.openDB();
        const transaction = db.transaction(this.storeName, 'readonly');
        const store = transaction.objectStore(this.storeName);
        const request = store.getAll();

        return new Promise<any[]>((resolve, reject) => {
            request.onsuccess = () => resolve(request.result); // Возвращаем результат
            request.onerror = () => reject(new Error('Failed to get all data'));
        });
    }

    public async add(data: any): Promise<any> {
        const db = await this.openDB();
        const transaction = db.transaction(this.storeName, 'readwrite');
        const store = transaction.objectStore(this.storeName);
        const request = store.add(data);

        await new Promise<void>((resolve, reject) => {
            request.onsuccess = () => resolve();
            request.onerror = () => reject(new Error('Failed to delete data'));
        });
    }

    public async addMultipleData(data: any[]): Promise<void> {
        const db = await this.openDB();
        const transaction = db.transaction(this.storeName, 'readwrite');
        const store = transaction.objectStore(this.storeName);

        const addPromises = data.map((item) => {
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

    public async update(data: any): Promise<void> {
        const db = await this.openDB();
        const transaction = db.transaction(this.storeName, 'readwrite');
        const store = transaction.objectStore(this.storeName);
        const request = store.put(data);

        await new Promise<void>((resolve, reject) => {
            request.onsuccess = () => resolve();
            request.onerror = () => reject(new Error('Failed to delete data'));
        });
    }

    public async delete(id: IDBValidKey): Promise<void> {
        const db = await this.openDB(); // Ожидание открытия базы данных
        const transaction = db.transaction(this.storeName, 'readwrite');
        const store = transaction.objectStore(this.storeName);
        const request = store.delete(id);

        // Оборачиваем асинхронную операцию в Promise
        await new Promise<void>((resolve, reject) => {
            request.onsuccess = () => resolve();
            request.onerror = () => reject(new Error('Failed to delete data'));
        });
    }
}

export default IndexDBHelper