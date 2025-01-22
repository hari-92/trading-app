import {API_CONFIG, HTTP_STATUS} from './api-config';
import {ApiError} from './api-error';

export interface RequestOptions extends RequestInit {
    params?: Record<string, string>;
    timeout?: number;
}

class ApiHelper {
    private static instance: ApiHelper;
    private controller: AbortController;

    private constructor() {
        this.controller = new AbortController();
    }

    public static getInstance(): ApiHelper {
        if (!ApiHelper.instance) {
            ApiHelper.instance = new ApiHelper();
        }
        return ApiHelper.instance;
    }

    private getHeaders(customHeaders?: HeadersInit): Headers {
        const headers = new Headers(customHeaders || {});

        if (!headers.has('Content-Type')) {
            headers.set('Content-Type', 'application/json');
        }

        // Add auth token if exists
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        if (token && !headers.has('Authorization')) {
            headers.set('Authorization', `Bearer ${token}`);
        }

        return headers;
    }

    private async handleResponse<T>(response: Response): Promise<T> {
        const contentType = response.headers.get('content-type');
        const isJson = contentType?.includes('application/json');
        const data = isJson ? await response.json() : await response.text();

        if (!response.ok) {
            throw new ApiError(
                data.message || 'An error occurred',
                response.status,
                data
            );
        }

        return data;
    }

    private createTimeout(timeout: number): Promise<never> {
        return new Promise((_, reject) => {
            setTimeout(() => {
                this.controller.abort();
                reject(new ApiError('Request timeout', 408));
            }, timeout);
        });
    }

    public async request<T = any>(
        endpoint: string,
        options: RequestOptions = {}
    ): Promise<T> {
        const {
            params,
            timeout = API_CONFIG.TIMEOUT,
            headers,
            ...restOptions
        } = options;

        // Build URL with query params
        const url = new URL(
            endpoint,
            API_CONFIG.BASE_URL
        );

        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                url.searchParams.append(key, value);
            });
        }

        try {
            const response = await Promise.race([
                fetch(url.toString(), {
                    ...restOptions,
                    headers: this.getHeaders(headers),
                    credentials: API_CONFIG.CREDENTIALS,
                    signal: this.controller.signal,
                }),
                this.createTimeout(timeout),
            ]);

            return await this.handleResponse<T>(response as Response);
        } catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(
                error instanceof Error ? error.message : 'Unknown error',
                HTTP_STATUS.INTERNAL_SERVER_ERROR
            );
        }
    }

    // Convenience methods
    public async get<T = any>(
        endpoint: string,
        options?: Omit<RequestOptions, 'method' | 'body'>
    ): Promise<T> {
        return this.request<T>(endpoint, { ...options, method: 'GET' });
    }

    public async post<T = any>(
        endpoint: string,
        data?: any,
        options?: Omit<RequestOptions, 'method' | 'body'>
    ): Promise<T> {
        return this.request<T>(endpoint, {
            ...options,
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    public async put<T = any>(
        endpoint: string,
        data?: any,
        options?: Omit<RequestOptions, 'method' | 'body'>
    ): Promise<T> {
        return this.request<T>(endpoint, {
            ...options,
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    public async delete<T = any>(
        endpoint: string,
        options?: Omit<RequestOptions, 'method' | 'body'>
    ): Promise<T> {
        return this.request<T>(endpoint, { ...options, method: 'DELETE' });
    }

    public async patch<T = any>(
        endpoint: string,
        data?: any,
        options?: Omit<RequestOptions, 'method' | 'body'>
    ): Promise<T> {
        return this.request<T>(endpoint, {
            ...options,
            method: 'PATCH',
            body: JSON.stringify(data),
        });
    }
}

export default ApiHelper.getInstance();
