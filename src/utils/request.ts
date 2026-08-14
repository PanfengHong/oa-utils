import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    AxiosError,
    InternalAxiosRequestConfig,
    Method,
} from 'axios';

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
 * 响应数据结构（可调整）
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

        // 响应拦截器
        this.instance.interceptors.response.use(
            (response) => {
                if (options.onResponse) return options.onResponse(response);
                return response.data;
            },
            (error) => {
                if (options.onResponseError) return options.onResponseError(error);
                console.error('Request Error:', error.message);
                return Promise.reject(error);
            }
        );
    }

    /**
     * 通用请求方法（支持配置对象）
     * 用法：request.request({ url: '/api/user', method: 'post', data })
     */
    async request<T = any>(options: RequestOptions): Promise<T> {
        const { url, method = 'GET', ...config } = options;
        return this.instance.request<T>({
            url,
            method,
            ...config,
        });
    }

    /**
     * GET 请求
     */
    get<T = any>(url: string, config?: RequestConfig): Promise<T> {
        return this.instance.get(url, config);
    }

    /**
     * POST 请求
     */
    post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
        return this.instance.post(url, data, config);
    }

    /**
     * PUT 请求
     */
    put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
        return this.instance.put(url, data, config);
    }

    /**
     * DELETE 请求
     */
    delete<T = any>(url: string, config?: RequestConfig): Promise<T> {
        return this.instance.delete(url, config);
    }

    /**
     * PATCH 请求
     */
    patch<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
        return this.instance.patch(url, data, config);
    }

    /**
     * 文件上传（FormData）
     */
    upload<T = any>(url: string, formData: FormData, config?: RequestConfig): Promise<T> {
        return this.instance.post(url, formData, {
            ...config,
            headers: {
                'Content-Type': 'multipart/form-data',
                ...(config?.headers || {}),
            },
        });
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

// 默认实例
export const request = new Request({
    baseURL: import.meta?.env?.VITE_API_BASE_URL || '',
    timeout: 10000,
});

// 导出类型
export type { AxiosRequestConfig, AxiosResponse, AxiosError, Method };