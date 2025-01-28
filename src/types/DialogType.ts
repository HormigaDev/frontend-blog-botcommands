export interface DialogType {
    show: boolean;
    message: string;
    actions: {
        ok: {
            label: string;
            onClick: () => void;
        };
        cancel: {
            label: string;
            onClick: () => void;
        };
    };
}
