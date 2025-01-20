import { Metadata } from 'next';
import { create } from 'zustand';

type Store = {
    metadata: Metadata;
    setMetadata: (state: Metadata) => void;
};

const useStore = create<Store>((set) => ({
    metadata: { title: '', description: '', keywords: [] },
    setMetadata: (newState: Metadata) => {
        set({ metadata: newState });
    },
}));

export default useStore;
