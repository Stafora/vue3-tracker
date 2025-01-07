import { LocalStorageService, LocalStorageError } from '../src/services/local-storage-service'
 
describe("LocalStorageService", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(window.localStorage.__proto__, "getItem");
        jest.spyOn(window.localStorage.__proto__, "setItem");
        jest.spyOn(window.localStorage.__proto__, "removeItem");
        jest.spyOn(window.localStorage.__proto__, "clear");
    });

    test("getItem should return parsed item from localStorage", () => {
        const mockValue = { name: "test" };
        window.localStorage.setItem("key", JSON.stringify(mockValue));

        const result = LocalStorageService.getItem("key");
        expect(result).toEqual(mockValue);
        expect(localStorage.getItem).toHaveBeenCalledWith("key");
        expect(window.localStorage.getItem).toHaveBeenCalledTimes(1)
    });

    test("getItem should return fallback if item is not found", () => {
        const fallback = { default: true };

        const result = LocalStorageService.getItem("nonexistent", fallback);
        expect(result).toEqual(fallback);
    });

    test("setItem should store a stringified item in localStorage", () => {
        const value = { name: "test" };
        LocalStorageService.setItem("key", value);

        expect(window.localStorage.setItem).toHaveBeenCalledTimes(1)
        expect(localStorage.setItem).toHaveBeenCalledWith("key", JSON.stringify(value));
    });

    test("removeItem should remove the specified key from localStorage", () => {
        LocalStorageService.removeItem("key");

        expect(window.localStorage.removeItem).toHaveBeenCalledTimes(1)
        expect(localStorage.removeItem).toHaveBeenCalledWith("key");
    });

    test("clearAllItems should clear localStorage", () => {
        LocalStorageService.clearAllItems();

        expect(window.localStorage.clear).toHaveBeenCalledTimes(1)
        expect(localStorage.clear).toHaveBeenCalled();
    });

    test("getItem should handle invalid JSON gracefully", () => {
        window.localStorage.setItem("invalidKey", "{invalidJson}");
    
        expect(() => LocalStorageService.getItem("invalidKey", "fallback")).toThrowError(LocalStorageError);
    });
});