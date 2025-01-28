'use client';
import { useEffect, useState } from 'react';
import useDialog from '@/stores/dialog.store';
import Button from './Button';

const Dialog: React.FC = () => {
    const { dialog, setDialog } = useDialog();
    const [isClosing, setIsClosing] = useState(false);

    const closeDialog = () => {
        setIsClosing(true);
        setTimeout(() => {
            setDialog({ ...dialog, show: false });
        }, 300);
    };

    useEffect(() => {
        if (!dialog.show && !isClosing) return;

        if (!dialog.show && isClosing) {
            setTimeout(() => {
                setDialog({ ...dialog, show: false });
                setIsClosing(false);
            }, 300);
        }
    }, [dialog.show, isClosing]);

    if (!dialog.show && !isClosing) return null;

    const cancelLabel = dialog.actions.cancel.label || 'Cancelar';
    const okLabel = dialog.actions.ok.label || 'Aceptar';

    return (
        <div
            className={`fixed inset-0 flex justify-center items-center bg-black bg-opacity-80 z-50 transition-opacity duration-300 ${
                isClosing ? 'opacity-0' : 'opacity-100'
            }`}
        >
            <div
                className={`bg-secondary-dark p-6 rounded-lg sm:w-[90%] md:w-[50%] lg:w-[30%] transition-all duration-300
                    ${isClosing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
            >
                <h2 className="text-foreground text-xl font-semibold mb-4 break-words text-center mb-12">
                    {dialog.message}
                </h2>
                <div className="flex flex-wrap justify-center gap-4 mt-4">
                    <Button
                        onClick={() => {
                            dialog.actions.cancel.onClick?.();
                            closeDialog();
                        }}
                        label={cancelLabel}
                        color="secondary"
                    />
                    <Button
                        onClick={() => {
                            dialog.actions.ok.onClick?.();
                            closeDialog();
                        }}
                        label={okLabel}
                        color={dialog.actions.ok.color || 'primary'}
                    />
                </div>
            </div>
        </div>
    );
};

export default Dialog;
