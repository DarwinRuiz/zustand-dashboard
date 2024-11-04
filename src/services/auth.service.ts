import { AxiosError } from "axios";
import { tesloAPI } from "../api/teslo.api";

export interface LoginResponse {
    id: string;
    email: string;
    fullName: string;
    isActive: boolean;
    roles: string[];
    token: string;
}


export class AuthService {
    static login = async (email: string, password: string): Promise<LoginResponse> => {
        try {
            const resp = await tesloAPI.post<LoginResponse>('/auth/login', { email, password });
            return resp.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error(error.response?.data);
                throw new Error(error.response?.data);
            }

            throw error;
        }
    }


    static checkStatus = async (): Promise<LoginResponse> => {
        try {
            const resp = await tesloAPI.get<LoginResponse>('/auth/check-status');
            return resp.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error(error.response?.data);
                throw new Error(error.response?.data);
            }

            throw error;
        }
    }
}