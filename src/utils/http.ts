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
export class HttpClient {
    private baseURL: string;

    constructor(baseURL = '') {
        this.baseURL = baseURL;
    }

    private async request<T>(
        url: string,
        options: HttpRequestConfig = {}
    ): Promise<HttpResponse<T>> {
        const { baseURL, params, ...rest } = options;
        const fullURL = new URL(url, baseURL || this.baseURL);

        // 处理查询参数
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    fullURL.searchParams.append(key, String(value));
                }
            });
        }

        const response = await fetch(fullURL.toString(), rest);

        let data: T;
        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
            data = await response.json();
        } else {
            data = (await response.text()) as unknown as T;
        }

        return {
            data,
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
        };
    }

    get<T>(url: string, config?: HttpRequestConfig): Promise<HttpResponse<T>> {
        return this.request<T>(url, { ...config, method: 'GET' });
    }

    post<T>(url: string, data?: any, config?: HttpRequestConfig): Promise<HttpResponse<T>> {
        return this.request<T>(url, {
            ...config,
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined,
            headers: {
                'Content-Type': 'application/json',
                ...(config?.headers || {}),
            },
        });
    }

    put<T>(url: string, data?: any, config?: HttpRequestConfig): Promise<HttpResponse<T>> {
        return this.request<T>(url, {
            ...config,
            method: 'PUT',
            body: data ? JSON.stringify(data) : undefined,
            headers: {
                'Content-Type': 'application/json',
                ...(config?.headers || {}),
            },
        });
    }

    delete<T>(url: string, config?: HttpRequestConfig): Promise<HttpResponse<T>> {
        return this.request<T>(url, { ...config, method: 'DELETE' });
    }
}

// 默认实例
export const http = new HttpClient();