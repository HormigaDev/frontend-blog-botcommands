import { notify } from '@/utils/notify';
import { http } from '../fetch';
import Router from 'next/router';

interface LoginData {
    email: string;
    password: string;
}

export const login = async (loginData: LoginData): Promise<void> => {
    await http.post('/auth/login', loginData);

    notify({
        message: 'Sesión iniciada correctamente',
        type: 'success',
    });

    setTimeout(() => {
        Router.push({
            pathname: '/dashboard',
        });
    }, 800);
};
