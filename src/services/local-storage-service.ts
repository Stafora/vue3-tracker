export const LocalStorageService = {
    getItem<T>(key:string, fallback: any): T {
        try {
            const item = window.localStorage.getItem(key)
            return item ? window.JSON.parse(item) : fallback
        } catch (err) {
            return fallback
        }
    },
    setItem<T>(key: string, value: T): void {
        window.localStorage.setItem(key, window.JSON.stringify(value))
    },
    removeItem(key: string): void {
        window.localStorage.removeItem(key)
    },
    clearAllItems(): void {
        window.localStorage.clear()
    }
}
