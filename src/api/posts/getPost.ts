import { Post } from '@/types/Post';
import { http } from '../fetch';

export const getPost = async (id: number): Promise<Post> => {
    const res: { post: Post } = await http.get(`/posts/post/${id}`);
    return res.post;
};
