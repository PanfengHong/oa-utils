/**
 * 本地存储（localStorage）封装
 */
export declare const storage: {
    get<T>(key: string, defaultValue?: T): T | null;
    set<T>(key: string, value: T): void;
    remove(key: string): void;
    clear(): void;
};
/**
 * 会话存储（sessionStorage）封装
 */
export declare const sessionStorageUtils: {
    get<T>(key: string, defaultValue?: T): T | null;
    set<T>(key: string, value: T): void;
    remove(key: string): void;
    clear(): void;
};
