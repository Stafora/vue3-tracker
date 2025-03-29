type DebounceFunctionType<T extends (...args: unknown[]) => void> = (
    ...args: Parameters<T>
  ) => void;
  
  export function debounce<T extends (...args: unknown[]) => void>(
    func: T,
    wait: number
  ): DebounceFunctionType<T> {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
  
    return (...args: Parameters<T>) => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, wait);
    };
  }
  