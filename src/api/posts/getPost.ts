import { Post } from '@/types/Post';
import { http } from '../fetch';
import { notify } from '@/utils/notify';
import { HttpException } from '@/types/HttpException';

export const getPost = async (id: number): Promise<Post> => {
    try {
        const res: { post: Post } = await http.get(`/posts/post/${id}`);
        return res.post;
    } catch (error) {
        const post: Post = {
            id,
            title: 'Error',
            content: 'Ocurrió un error al cargar el post',
            shortDescription: 'Ocurrió un error al cargar el post',
            createdAt: new Date(),
            lastUpdate: new Date(),
            keywords: ['discord', 'bot', 'commands'],
            status: 1,
            userId: 1,
        };
        if (error instanceof HttpException) {
            notify({ message: error.message, type: 'error' });
        } else {
            notify({ message: 'Ocurrió un error inesperado', type: 'error' });
            console.log(error);
        }
        return post;
    }
};
