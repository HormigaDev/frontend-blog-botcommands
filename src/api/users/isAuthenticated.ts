import { HttpException } from '@/types/HttpException';
import { http } from '../fetch';
import { notify } from '@/utils/notify';

export const isAuthenticated = async (): Promise<boolean> => {
    try {
        const res: { message: string } = await http.get('/auth/authenticated');
        if (res.message === 'IS AUTHENTICATED') {
            return true;
        }
    } catch (error) {
        if (error instanceof HttpException) {
            if ([401, 403].includes(error.statusCode)) {
                return false;
            }
        } else {
            notify({ message: 'Ocurrió un error inesperado', type: 'error' });
            throw error;
        }
    }

    return false;
};
