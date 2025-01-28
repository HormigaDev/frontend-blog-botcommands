import { create } from 'zustand';

interface PostState {
    post: {
        id?: number;
        title: string;
        shortDescription: string;
        keywords: string[];
        show: boolean;
        editing: boolean;
    };
    setPost: (post: Partial<PostState['post']>) => void;
}

const usePostStore = create<PostState>((set) => ({
    post: {
        id: 0,
        title: '',
        shortDescription: '',
        keywords: [],
        show: false,
        editing: false,
    },
    setPost: (newPost) =>
        set((state) => ({
            post: { ...state.post, ...newPost },
        })),
}));

export default usePostStore;
