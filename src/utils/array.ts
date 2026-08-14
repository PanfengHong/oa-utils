/**
 * 数组去重
 */
export const unique = <T>(arr: T[]): T[] => {
    return [...new Set(arr)];
};

/**
 * 数组分组
 */
export const groupBy = <T, K extends string | number | symbol>(
    arr: T[],
    keySelector: (item: T) => K
): Record<K, T[]> => {
    return arr.reduce((acc, item) => {
        const key = keySelector(item);
        if (!acc[key]) acc[key] = [];
        acc[key].push(item);
        return acc;
    }, {} as Record<K, T[]>);
};

/**
 * 数组最大值
 */
export const max = (arr: number[]): number => {
    if (arr.length === 0) throw new Error('Array is empty');
    return Math.max(...arr);
};

/**
 * 数组最小值
 */
export const min = (arr: number[]): number => {
    if (arr.length === 0) throw new Error('Array is empty');
    return Math.min(...arr);
};

/**
 * 数组求和
 */
export const sum = (arr: number[]): number => {
    return arr.reduce((acc, val) => acc + val, 0);
};

/**
 * 数组平均值
 */
export const average = (arr: number[]): number => {
    if (arr.length === 0) throw new Error('Array is empty');
    return sum(arr) / arr.length;
};

/**
 * 移除数组中的指定项（改变原数组）
 */
export const removeItem = <T>(arr: T[], item: T): T[] => {
    const index = arr.indexOf(item);
    if (index > -1) arr.splice(index, 1);
    return arr;
};