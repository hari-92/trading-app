// utils/apiHelper.ts

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://your-api-base-url';

interface RequestOptions {
    headers?: HeadersInit;
    params?: Record<string, string>;
    body?: any;
}

class ApiHelper {
    private static async request(
        endpoint: string,
        method: string,
        options: RequestOptions = {}
    ) {
        const { headers = {}, params, body } = options;

        // Xử lý query params
        const queryParams = params
            ? `?${new URLSearchParams(params).toString()}`
            : '';

        // Combine default headers với custom headers
        const defaultHeaders = {
            'Content-Type': 'application/json',
            // Thêm authorization header nếu có token
            ...(localStorage.getItem('token') && {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }),
            ...headers
        };

        try {
            const response = await fetch(`${BASE_URL}${endpoint}${queryParams}`, {
                method,
                headers: defaultHeaders,
                body: body ? JSON.stringify(body) : null,
            });

            // Handle response
            if (!response.ok) {
                // Handle different error status codes
                switch (response.status) {
                    case 401:
                        // Handle unauthorized
                        throw new Error('Unauthorized');
                    case 403:
                        // Handle forbidden
                        throw new Error('Forbidden');
                    case 404:
                        // Handle not found
                        throw new Error('Not found');
                    default:
                        throw new Error('Request failed');
                }
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    // GET request
    static async get(endpoint: string, options: RequestOptions = {}) {
        return this.request(endpoint, 'GET', options);
    }

    // POST request
    static async post(endpoint: string, body: any, options: RequestOptions = {}) {
        return this.request(endpoint, 'POST', { ...options, body });
    }

    // PUT request
    static async put(endpoint: string, body: any, options: RequestOptions = {}) {
        return this.request(endpoint, 'PUT', { ...options, body });
    }

    // PATCH request
    static async patch(endpoint: string, body: any, options: RequestOptions = {}) {
        return this.request(endpoint, 'PATCH', { ...options, body });
    }

    // DELETE request
    static async delete(endpoint: string, options: RequestOptions = {}) {
        return this.request(endpoint, 'DELETE', options);
    }
}

export default ApiHelper;
