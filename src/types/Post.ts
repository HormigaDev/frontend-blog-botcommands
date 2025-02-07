export interface PostContent {
    id: number;
    identifier: string;
    content: string;
}

export interface Post {
    id: number;
    title: string;
    shortDescription: string;
    contents: PostContent[];
    userId: number;
    status: number;
    keywords: string[];
    createdAt: Date;
    lastUpdate: Date;
}
