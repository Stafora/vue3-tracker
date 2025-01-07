export class LocalStorageError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'LocalStorageError';
    }
}

export const LocalStorageService = {
    getItem<T>(key: string, fallback?: any): T | undefined {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : fallback;
        } catch (err) {
            throw new LocalStorageError(`Failed to parse item for key "${key}": ${err instanceof Error ? err.message : String(err)}`);
        }
    },
    setItem<T>(key: string, value: T): void {
        try {
            const jsonString = JSON.stringify(value);
            window.localStorage.setItem(key, jsonString);
        } catch (err) {
            throw new LocalStorageError(`Failed to set item for key "${key}": ${err instanceof Error ? err.message : String(err)}`);
        }
    },
    removeItem(key: string): void {
        try {
            window.localStorage.removeItem(key);
        } catch (err) {
            throw new LocalStorageError(`Failed to remove item for key "${key}": ${err instanceof Error ? err.message : String(err)}`);
        }
    },
    clearAllItems(): void {
        try {
            window.localStorage.clear();
        } catch (err) {
            throw new LocalStorageError(`Failed to clear all items in localStorage: ${err instanceof Error ? err.message : String(err)}`);
        }
    }
};