/**
 * 格式化日期
 */
export function formatDate(date: Date | string | number, locale = 'zh-CN'): string {
    const d = new Date(date);
    if (isNaN(d.getTime())) throw new Error('Invalid date');
    return d.toLocaleDateString(locale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
}

/**
 * 格式化时间
 */
export function formatTime(date: Date | string | number, locale = 'zh-CN'): string {
    const d = new Date(date);
    if (isNaN(d.getTime())) throw new Error('Invalid date');
    return d.toLocaleTimeString(locale, {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
}

/**
 * 格式化日期+时间
 */
export function formatDateTime(date: Date | string | number, locale = 'zh-CN'): string {
    return `${formatDate(date, locale)} ${formatTime(date, locale)}`;
}

/**
 * 格式化货币
 */
export function formatCurrency(amount: number, currency = 'CNY', locale = 'zh-CN'): string {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
    }).format(amount);
}

/**
 * 格式化文件大小（字节 -> 可读）
 */
export function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    const k = 1024;
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const size = (bytes / Math.pow(k, i)).toFixed(2);
    return `${size} ${units[i]}`;
}