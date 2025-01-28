import { create } from 'zustand';

type DialogAction = {
    label: string;
    color?: 'primary' | 'error' | 'warning' | 'success' | 'secondary';
    onClick?: () => void;
};

type DialogStore = {
    dialog: {
        show: boolean;
        message: string;
        actions: {
            ok: DialogAction;
            cancel: DialogAction;
        };
    };
    setDialog: (newState: DialogStore['dialog']) => void;
};

const useDialog = create<DialogStore>((set) => ({
    dialog: {
        show: false,
        message: '',
        actions: {
            ok: { label: '', onClick: () => {} },
            cancel: { label: '', onClick: () => {} },
        },
    },
    setDialog: (newState: DialogStore['dialog']) => {
        set({ dialog: newState });
    },
}));

export default useDialog;
