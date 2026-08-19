/**
 * 深度克隆
 */
export declare const deepClone: <T>(obj: T) => T;
/**
 * 对象合并（深度合并）
 */
export declare const deepMerge: <T extends Record<string, any>>(target: T, source: Partial<T>) => T;
/**
 * 提取对象指定字段
 */
export declare const pick: <T extends Record<string, any>, K extends keyof T>(obj: T, keys: K[]) => Pick<T, K>;
/**
 * 排除对象指定字段
 */
export declare const omit: <T extends Record<string, any>, K extends keyof T>(obj: T, keys: K[]) => Omit<T, K>;
/**
 * 对象转 URL 查询字符串
 */
export declare const toQueryString: (params: Record<string, any>) => string;
