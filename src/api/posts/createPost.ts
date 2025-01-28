import { HttpException } from '@/types/HttpException';
import { http } from '../fetch';
import { notify } from '@/utils/notify';

export const createPost = async (formData: FormData): Promise<number> => {
    try {
        const res: { status: number } = await http.post('/posts/upload', formData);

        return res.status;
    } catch (error) {
        if (error instanceof HttpException) {
            switch (error.statusCode) {
                case 401:
                    notify({ message: 'No autorizado' });
                    break;
                case 400:
                    notify({ message: 'Error en los datos de entrada' });
                    break;
                case 403:
                    notify({ message: 'Usuario sin autorización' });
                    break;
            }
        } else {
            notify({ message: 'Ocurrió un error inesperado' });
            console.error(error);
        }
        return 0;
    }
};
