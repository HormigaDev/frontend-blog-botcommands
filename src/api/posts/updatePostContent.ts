import { HttpException } from '@/types/HttpException';
import { http } from '../fetch';
import { notify } from '@/utils/notify';

export const updatePostContent = async (postContent: {
    id: number;
    identifier: string;
    content: string;
}): Promise<number> => {
    try {
        const res: { status: number } = await http.put(
            `/posts/post-content/update/${postContent.id}`,
            {
                identifier: postContent.identifier,
                content: postContent.content,
            },
        );

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
