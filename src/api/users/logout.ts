import { http } from '../fetch';

export const logout = async () => {
    await http.post('/auth/logout');
};
