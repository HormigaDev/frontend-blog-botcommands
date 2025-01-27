import { http } from '../fetch';

export const registerPostView = async (id: number): Promise<void> => {
    try {
        await http.put('/posts/view/' + id, {});
    } catch (error) {
        console.log(error);
    }
};
