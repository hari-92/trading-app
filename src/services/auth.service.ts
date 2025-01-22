// services/auth.service.ts

import apiHelper from '@/lib/api-helper';

export interface GoogleAuthPayload {
    token: string;
    email: string;
    name: string;
}

export interface AuthResponse {
    token: string;
    user: {
        id: string;
        email: string;
        name: string;
    };
}

class AuthService {
    private static readonly BASE_PATH = '/auth';

    public static async loginWithGoogle(payload: GoogleAuthPayload): Promise<AuthResponse> {
        return apiHelper.post<AuthResponse>(`${this.BASE_PATH}/google`, payload);
    }

    public static async logout(): Promise<void> {
        return apiHelper.post(`${this.BASE_PATH}/logout`);
    }

    public static async refreshToken(): Promise<AuthResponse> {
        return apiHelper.post<AuthResponse>(`${this.BASE_PATH}/refresh`);
    }

    public static async getProfile(): Promise<AuthResponse['user']> {
        return apiHelper.get(`${this.BASE_PATH}/me`);
    }
}

export default AuthService;
