import { nanoid } from 'nanoid';

/**
 * 首字母大写
 */
export const capitalize = (str: string): string => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * 驼峰转下划线
 */
export const camelToSnake = (str: string): string => {
    return str.replace(/([A-Z])/g, '_$1').toLowerCase();
};

/**
 * 下划线转驼峰
 */
export const snakeToCamel = (str: string): string => {
    return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
};

/**
 * 生成随机字符串
 */
export const randomString = (length = 8): string => {
    return nanoid(length);
};

/**
 * 截断字符串（添加省略号）
 */
export const truncate = (str: string, maxLength: number, suffix = '...'): string => {
    if (str.length <= maxLength) return str;
    return str.slice(0, maxLength) + suffix;
};