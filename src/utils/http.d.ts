export interface HttpRequestConfig extends RequestInit {
    baseURL?: string;
    params?: Record<string, any>;
}
export interface HttpResponse<T = any> {
    data: T;
    status: number;
    statusText: string;
    headers: Headers;
}
/**
 * 基于 fetch 的 HTTP 请求封装
 */
export declare class HttpClient {
    private baseURL;
    constructor(baseURL?: string);
    private request;
    get<T>(url: string, config?: HttpRequestConfig): Promise<HttpResponse<T>>;
    post<T>(url: string, data?: any, config?: HttpRequestConfig): Promise<HttpResponse<T>>;
    put<T>(url: string, data?: any, config?: HttpRequestConfig): Promise<HttpResponse<T>>;
    delete<T>(url: string, config?: HttpRequestConfig): Promise<HttpResponse<T>>;
}
export declare const http: HttpClient;
