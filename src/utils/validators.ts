
export const isString = (value: unknown): boolean => Object.prototype.toString.call(value) === '[object String]'

export const isNumber = (value: unknown): boolean => Object.prototype.toString.call(value) === '[object Number]'

export const isBoolean = (value: unknown): boolean => Object.prototype.toString.call(value) === '[object Boolean]'

export const isObject = (value: unknown): boolean => Object.prototype.toString.call(value) === '[object Object]'

export const isEmpty = (value: unknown): boolean => {
    if (value === null || value === undefined) return true;
    if (typeof value === 'string') return value.trim().length === 0;
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === 'object') return Object.keys(value).length === 0;
    return false;
};

export const isURL = (url: string): boolean => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

export const isEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isPhone = (phone: string): boolean => {
    return /^1[3-9]\d{9}$/.test(phone);
};

export const isIdCard = (id: string): boolean => {
    // 简单身份证校验（18位，最后一位可为X）
    return /^[1-9]\d{5}(18|19|20)?\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/.test(id);
};
