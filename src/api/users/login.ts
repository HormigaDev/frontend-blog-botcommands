import { notify } from '@/utils/notify';
import { http } from '../fetch';
import { HttpException } from '@/types/HttpException';

interface LoginData {
    email: string;
    password: string;
}

export const login = async (loginData: LoginData, callback: () => void): Promise<void | number> => {
    try {
        await http.post('/auth/login', loginData);
    } catch (error) {
        if (error instanceof HttpException) {
            return error.statusCode;
        }
    }

    notify({
        message: 'Sesión iniciada correctamente',
        type: 'success',
    });

    setTimeout(callback, 800);
};
