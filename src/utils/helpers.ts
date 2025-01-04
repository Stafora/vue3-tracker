type DebounceFunctionType<T extends (...args: any[]) => void> = (
    ...args: Parameters<T>
  ) => void
  
export function debounce<T extends (...args: any[]) => void>(
    func: T,
    wait: number
): DebounceFunctionType<T> {
    let timeoutId: ReturnType<typeof setTimeout> | null = null
  
    return function (...args: Parameters<T>) {
        if (timeoutId !== null) {
            clearTimeout(timeoutId)
        }
        timeoutId = setTimeout(() => {
            func(...args)
        }, wait);
    };
}