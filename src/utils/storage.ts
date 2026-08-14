/**
 * 本地存储（localStorage）封装
 */
export const storage = {
    get<T>(key: string, defaultValue?: T): T | null {
        try {
            const item = localStorage.getItem(key);
            if (item === null) return defaultValue ?? null;
            return JSON.parse(item) as T;
        } catch {
            return defaultValue ?? null;
        }
    },

    set<T>(key: string, value: T): void {
        localStorage.setItem(key, JSON.stringify(value));
    },

    remove(key: string): void {
        localStorage.removeItem(key);
    },

    clear(): void {
        localStorage.clear();
    },
};

/**
 * 会话存储（sessionStorage）封装
 */
export const sessionStorageUtils = {
    get<T>(key: string, defaultValue?: T): T | null {
        try {
            const item = sessionStorage.getItem(key);
            if (item === null) return defaultValue ?? null;
            return JSON.parse(item) as T;
        } catch {
            return defaultValue ?? null;
        }
    },

    set<T>(key: string, value: T): void {
        sessionStorage.setItem(key, JSON.stringify(value));
    },

    remove(key: string): void {
        sessionStorage.removeItem(key);
    },

    clear(): void {
        sessionStorage.clear();
    },
};