/**
 * 数组去重
 */
export declare const unique: <T>(arr: T[]) => T[];
/**
 * 数组分组
 */
export declare const groupBy: <T, K extends string | number | symbol>(arr: T[], keySelector: (item: T) => K) => Record<K, T[]>;
/**
 * 数组最大值
 */
export declare const max: (arr: number[]) => number;
/**
 * 数组最小值
 */
export declare const min: (arr: number[]) => number;
/**
 * 数组求和
 */
export declare const sum: (arr: number[]) => number;
/**
 * 数组平均值
 */
export declare const average: (arr: number[]) => number;
/**
 * 移除数组中的指定项（改变原数组）
 */
export declare const removeItem: <T>(arr: T[], item: T) => T[];
