export interface SearchPostsPreferences {
    orderBy: string;
    order: 'ASC' | 'DESC';
    query: string;
    limit: number;
    page: number;
}
