/**
 * 首字母大写
 */
export declare const capitalize: (str: string) => string;
/**
 * 驼峰转下划线
 */
export declare const camelToSnake: (str: string) => string;
/**
 * 下划线转驼峰
 */
export declare const snakeToCamel: (str: string) => string;
/**
 * 生成随机字符串
 */
export declare const randomString: (length?: number) => string;
/**
 * 截断字符串（添加省略号）
 */
export declare const truncate: (str: string, maxLength: number, suffix?: string) => string;
