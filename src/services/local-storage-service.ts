export const LocalStorageService = {
    getItem (key:string, fallback: any): any {
        try {
            const item = window.localStorage.getItem(key)
            return item ? window.JSON.parse(item) : fallback
        } catch (err) {
            return fallback
        }
    },
    setItem (key: string, value: any = {}): void {
        window.localStorage.setItem(key, window.JSON.stringify(value))
    },
    removeItem (key: string): void {
        window.localStorage.removeItem(key)
    },
    clearAllItems () {
        window.localStorage.clear()
    }
}
