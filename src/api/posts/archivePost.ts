import { HttpException } from '@/types/HttpException';
import { http } from '../fetch';
import { notify } from '@/utils/notify';

export const archivePost = async (id: number) => {
    try {
        const res: { status: number } = await http.put('/posts/archive/' + id, {});
        if (res.status === 204) {
            notify({ message: 'Post archivado correctamente.', type: 'success' });
        }
    } catch (error) {
        if (error instanceof HttpException) {
            notify({ message: error.message, type: 'error' });
        } else {
            notify({ message: 'Ocurrió un error inesperado', type: 'error' });
            console.error(error);
        }
    }
};
