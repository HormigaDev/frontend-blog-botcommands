import { toast } from 'react-toastify';
import { toastStyles } from '@/utils/toastStyles';

interface NotifyData {
    message?: string;
    type?: 'success' | 'info' | 'error' | 'warning';
}

export const notify = (data: NotifyData = {}) => {
    if (!data.message) data.message = '';
    if (!data.type) data.type = 'error';
    switch (data.type) {
        case 'error':
            toast.error(data.message, {
                style: toastStyles.error,
            });
            break;
        case 'info':
            toast.info(data.message, {
                style: toastStyles.info,
            });
            break;
        case 'success':
            toast.success(data.message, {
                style: toastStyles.success,
            });
            break;
        case 'warning':
            toast.warning(data.message, {
                style: toastStyles.warning,
            });
    }
};
