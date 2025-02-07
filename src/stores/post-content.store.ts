import { create } from 'zustand';

interface PostContentState {
    postContent: {
        id?: number;
        postId?: number;
        show: boolean;
        editing: boolean;
        identifier: string;
    };
    setPostContent: (post: Partial<PostContentState['postContent']>) => void;
}

const usePostContentStore = create<PostContentState>((set) => ({
    postContent: {
        id: 0,
        postId: 0,
        show: false,
        editing: false,
        identifier: '',
    },
    setPostContent: (newPost) =>
        set((state) => ({
            postContent: { ...state.postContent, ...newPost },
        })),
}));

export default usePostContentStore;
