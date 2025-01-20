import { http } from '../fetch';

export const createPost = async (formData: FormData): Promise<string> => {
    const res: { message: string } = await http.post('/posts/upload', formData);

    return res.message;
};
