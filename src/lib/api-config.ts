type RequestCredentials = 'omit' | 'same-origin' | 'include';

export const API_CONFIG = {
    BASE_URL: process.env.NEXT_PUBLIC_API_URL,
    TIMEOUT: 30000, // 30 seconds
    CREDENTIALS: 'include' as RequestCredentials,
};

export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};

export type ApiResponse<T = any> = {
    data?: T;
    error?: string;
    status: number;
};
