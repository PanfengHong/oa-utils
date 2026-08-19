import axios, {
    AxiosError,
} from 'axios';
import type {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig,
    Method,
} from 'axios';
import { matchMock } from './mock';

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
    method?: Method; // 'get' | 'post' | 'put' | 'delete' | 'patch'
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
 * 判断后端返回值是否已经是标准结构 { code, data, message }
 */
function isStandardBackendData(value: unknown): value is { code: number; data: any; message?: string } {
    return (
        !!value &&
        typeof value === 'object' &&
        'code' in (value as any) &&
        'data' in (value as any)
    );
}

/**
 * 把任意后端返回值包装成统一 ResponseData
 * - 后端返回标准结构 { code, data, message } 时沿用业务 code
 * - 后端直接返回数据（数组/对象/原始值）时整体作为 data，code 置 200（视为成功）
 */
function wrapResponse<T>(response: AxiosResponse<T>): ResponseData<T> {
    const backendData = response.data as unknown;
    if (isStandardBackendData(backendData)) {
        return {
            code: backendData.code,
            data: backendData.data,
            message: backendData.message || '',
        };
    }
    return {
        code: 200,
        data: backendData as T,
        message: '',
    };
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

export class Request {
    private instance: AxiosInstance;

    constructor(options: CreateRequestOptions = {}) {
        const { baseURL, timeout = 10000, headers = {} } = options;

        this.instance = axios.create({
            baseURL,
            timeout,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
        });

        // 请求拦截器
        this.instance.interceptors.request.use(
            (config) => {
                if (options.onRequest) return options.onRequest(config);
                return config;
            },
            (error) => {
                if (options.onRequestError) return options.onRequestError(error);
                return Promise.reject(error);
            }
        );

        // 响应拦截器：统一把原始响应包装成 ResponseData
        this.instance.interceptors.response.use(
            (response) => {
                if (options.onResponse) return options.onResponse(response);
                return wrapResponse(response);
            },
            (error) => {
                if (options.onResponseError) return options.onResponseError(error);
                const status: number = error?.response?.status ?? 0;
                const backendData: unknown = error?.response?.data;
                // 后端在错误体里给了标准结构，沿用其 code/message/data
                if (isStandardBackendData(backendData)) {
                    return Promise.reject({
                        code: backendData.code,
                        status,
                        data: backendData.data,
                        message: backendData.message || error.message,
                    } as ResponseData);
                }
                console.error('Request Error:', error.message);
                return Promise.reject({
                    code: status,
                    status,
                    data: null,
                    message: error?.message || '请求失败',
                } as ResponseData);
            }
        );
    }

    /**
     * 通用请求方法（支持配置对象）
     * 返回统一结构 ResponseData<T>：{ code, data, message }（code === 200 表示成功）
     *
     * 若 mock 已启用且 URL 命中已注册的 mock 规则，则直接短路返回 mock 数据，不发起真实请求。
     */
    async request<T = any>(options: RequestOptions): Promise<ResponseData<T>> {
        const { url, method = 'GET', data, params } = options;

        // mock 拦截：命中则短路返回
        const mocked = matchMock(String(method), url, {
            query: params || {},
            body: data,
            headers: {},
        });
        if (mocked !== null) {
            return Promise.resolve(mocked as ResponseData<T>);
        }

        const { url: _u, method: _m, ...config } = options;
        return this.instance.request<T>({
            url,
            method,
            ...config,
        }) as unknown as Promise<ResponseData<T>>;
    }

    /**
     * GET 请求
     */
    async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<ResponseData<T>> {
        return this.instance.get<T>(url, config) as unknown as Promise<ResponseData<T>>;
    }

    /**
     * POST 请求
     */
    async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ResponseData<T>> {
        return this.instance.post<T>(url, data, config) as unknown as Promise<ResponseData<T>>;
    }

    /**
     * PUT 请求
     */
    async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ResponseData<T>> {
        return this.instance.put<T>(url, data, config) as unknown as Promise<ResponseData<T>>;
    }

    /**
     * DELETE 请求
     */
    async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ResponseData<T>> {
        return this.instance.delete<T>(url, config) as unknown as Promise<ResponseData<T>>;
    }

    /**
     * PATCH 请求
     */
    async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ResponseData<T>> {
        return this.instance.patch<T>(url, data, config) as unknown as Promise<ResponseData<T>>;
    }

    /**
     * 文件上传（FormData）
     */
    async upload<T = any>(url: string, formData: FormData, config?: AxiosRequestConfig): Promise<ResponseData<T>> {
        return this.instance.post<T>(url, formData, {
            ...config,
            headers: {
                'Content-Type': 'multipart/form-data',
                ...(config?.headers || {}),
            },
        }) as unknown as Promise<ResponseData<T>>;
    }

    /**
     * 文件下载（blob）
     */
    download(url: string, config?: RequestConfig): Promise<Blob> {
        return this.instance.get(url, {
            ...config,
            responseType: 'blob',
        });
    }

    /**
     * 获取原始 axios 实例（高级用途）
     */
    getInstance(): AxiosInstance {
        return this.instance;
    }
}

/**
 * 从 localStorage 读取认证 token（与 oa-auth 的存储约定保持一致）
 * 存储键：oa_auth_storage，结构：{ token, refreshToken, expiresAt, user }
 */
function getAuthToken(): string | null {
    try {
        const raw = localStorage.getItem('oa_auth_storage');
        if (!raw) return null;
        const stored = JSON.parse(raw) as { token?: string; expiresAt?: number };
        if (!stored?.token) return null;
        // token 已过期则不携带
        if (typeof stored.expiresAt === 'number' && stored.expiresAt <= Date.now()) {
            return null;
        }
        return stored.token;
    } catch {
        return null;
    }
}

// 默认实例
export const request = new Request({
    baseURL: import.meta?.env?.VITE_API_BASE_URL || '',
    timeout: 10000,
    onRequest: (config) => {
        const token = getAuthToken();
        if (token) {
            (config.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
});

// 导出类型
export type { AxiosRequestConfig, AxiosResponse, AxiosError, Method };