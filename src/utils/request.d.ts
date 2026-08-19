import { AxiosError } from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig, Method } from 'axios';
/**
 * 自定义请求配置（扩展 AxiosRequestConfig）
 */
export interface RequestConfig extends AxiosRequestConfig {
    /** 是否显示加载状态（业务可自定义） */
    showLoading?: boolean;
    /** 是否显示错误提示（业务可自定义） */
    showError?: boolean;
}
/**
 * 通用请求配置（用于 request 方法）
 */
export interface RequestOptions extends RequestConfig {
    url: string;
    method?: Method;
}
/**
 * 统一响应数据结构
 * - code:    状态码（200 表示成功；其他值为错误码，错误时优先用后端业务码，无业务码时用 HTTP 状态码）
 * - data:    业务数据本体
 * - message: 提示信息（成功/失败描述）
 *
 * 注：response 不包含 success 字段，成功与否统一用 code === 200 判断。
 */
export interface ResponseData<T = any> {
    code: number;
    data: T;
    message: string;
}
/**
 * 创建实例配置
 */
export interface CreateRequestOptions {
    baseURL?: string;
    timeout?: number;
    headers?: Record<string, string>;
    onRequest?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;
    onRequestError?: (error: AxiosError) => Promise<never>;
    onResponse?: <T = any>(response: AxiosResponse<T>) => T | Promise<T>;
    onResponseError?: (error: AxiosError) => Promise<never>;
}
export declare class Request {
    private instance;
    constructor(options?: CreateRequestOptions);
    /**
     * 通用请求方法（支持配置对象）
     * 返回统一结构 ResponseData<T>：{ code, data, message }（code === 200 表示成功）
     *
     * 若 mock 已启用且 URL 命中已注册的 mock 规则，则直接短路返回 mock 数据，不发起真实请求。
     */
    request<T = any>(options: RequestOptions): Promise<ResponseData<T>>;
    /**
     * GET 请求
     */
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<ResponseData<T>>;
    /**
     * POST 请求
     */
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ResponseData<T>>;
    /**
     * PUT 请求
     */
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ResponseData<T>>;
    /**
     * DELETE 请求
     */
    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ResponseData<T>>;
    /**
     * PATCH 请求
     */
    patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ResponseData<T>>;
    /**
     * 文件上传（FormData）
     */
    upload<T = any>(url: string, formData: FormData, config?: AxiosRequestConfig): Promise<ResponseData<T>>;
    /**
     * 文件下载（blob）
     */
    download(url: string, config?: RequestConfig): Promise<Blob>;
    /**
     * 获取原始 axios 实例（高级用途）
     */
    getInstance(): AxiosInstance;
}
export declare const request: Request;
export type { AxiosRequestConfig, AxiosResponse, AxiosError, Method };
