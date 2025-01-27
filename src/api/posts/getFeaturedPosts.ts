import { Pagination } from '@/types/Pagination';
import { http } from '../fetch';
import { Post } from '@/types/Post';
import { OrderByOptions } from '@/types/OrderByOptions';

interface PostsResult {
    posts: Post[];
    count: number;
}

export const getFeaturedPosts = async (): Promise<PostsResult> => {
    const pagination: Pagination = { limit: 3, page: 1 };
    const order: OrderByOptions = { by: 'views', order: 'DESC' };
    const params = new URLSearchParams();
    params.append('pagination[page]', pagination.page.toString());
    params.append('pagination[limit]', pagination.limit.toString());

    params.append('order[by]', order.by);
    params.append('order[order]', order.order);

    const url = `/posts/all?${params.toString()}`;

    try {
        const res: PostsResult = await http.get(url);
        res.posts = res.posts.map((p) => {
            p.content = p.content.replaceAll('\\n', '\n');
            return p;
        });

        return res;
    } catch (error) {
        http.handleError(error);
        return { posts: [], count: 0 } as PostsResult;
    }
};
