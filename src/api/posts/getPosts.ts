import { Pagination } from '@/types/Pagination';
import { http } from '../fetch';
import { Post } from '@/types/Post';
import { PostFilters } from '@/types/PostFilters';
import { OrderByOptions } from '@/types/OrderByOptions';

interface PostsResult {
    posts: Post[];
    count: number;
}

export const getPosts = async (
    pagination: Pagination,
    order: OrderByOptions,
    filters: PostFilters | null = null,
): Promise<PostsResult> => {
    const params = new URLSearchParams();
    params.append('pagination[page]', pagination.page.toString());
    params.append('pagination[limit]', pagination.limit.toString());
    if (filters) {
        if (filters.startDate) {
            params.append('filters[startDate]', filters.startDate.toISOString());
        }
        if (filters.endDate) {
            params.append('filters[endDate]', filters.endDate.toISOString());
        }
        if (filters.query) {
            params.append('filters[query]', filters.query);
        }
        if (filters.status) {
            params.append('filters[status]', filters.status.toString());
        }
    }

    params.append('order[by]', order.by);
    params.append('order[order]', order.order);

    const url = `/posts/all?${params.toString()}`;

    const res: PostsResult = await http.get(url);
    res.posts = res.posts.map((p) => {
        p.content = p.content.replaceAll('\\n', '\n');
        return p;
    });

    return res;
};
