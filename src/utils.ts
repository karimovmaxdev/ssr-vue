type DebounceFunction<T extends (...args: any[]) => any> =
    (...args: Parameters<T>) => void;

export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): DebounceFunction<T> {
    let timeout: NodeJS.Timeout | null;

    return function executedFunction(...args: Parameters<T>) {
        const later = () => {
            if (timeout) {
                timeout = null;
            }
            func(...args);
        };

        if (timeout) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(later, wait);
    };
}
