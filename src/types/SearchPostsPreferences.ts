export interface SearchPostsPreferences {
    orderBy: string;
    order: 'ASC' | 'DESC';
    startDate: string;
    endDate: string;
    query: string;
    limit: number;
    page: number;
}
