export interface Post {
    id: number;
    title: string;
    content: string;
    userId: number;
    status: number;
    keywords: string[];
    createdAt: Date;
    lastUpdate: Date;
}
