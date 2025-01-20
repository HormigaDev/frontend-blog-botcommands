import { http } from '../fetch';
import Router from 'next/router';

export const logout = async () => {
    await http.post('/auth/logout');

    Router.push({
        pathname: '/',
    });
};
