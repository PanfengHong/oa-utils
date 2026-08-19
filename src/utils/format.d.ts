/**
 * 格式化日期
 */
export declare function formatDate(date: Date | string | number, locale?: string): string;
/**
 * 格式化时间
 */
export declare function formatTime(date: Date | string | number, locale?: string): string;
/**
 * 格式化日期+时间
 */
export declare function formatDateTime(date: Date | string | number, locale?: string): string;
/**
 * 格式化货币
 */
export declare function formatCurrency(amount: number, currency?: string, locale?: string): string;
/**
 * 格式化文件大小（字节 -> 可读）
 */
export declare function formatFileSize(bytes: number): string;
