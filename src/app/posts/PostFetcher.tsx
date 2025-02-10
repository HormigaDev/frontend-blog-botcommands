// components/server/PostFetcher.tsx
'use server';

import { getPosts } from '@/api/posts/getPosts';
import { SearchPostsPreferences } from '@/types/SearchPostsPreferences';

interface PostFetcherProps {
    preferences: SearchPostsPreferences;
    startDate: string;
    endDate: string;
}

export default async function PostFetcher({ preferences, startDate, endDate }: PostFetcherProps) {
    const { limit, page, orderBy, order, query } = preferences;

    const startdate = startDate || '1900-01-01';
    const enddate = endDate || '2100-01-01';

    const data = await getPosts(
        { limit, page },
        { by: orderBy, order },
        {
            startDate: new Date(startdate),
            endDate: new Date(enddate),
            query,
        },
    );

    return data;
}
