import { toast } from 'react-toastify';

export const toastMsg = (message, type = 'success') => {
    type === 'error' ? toast.error(message) : type === 'info' ? toast.info(message) : toast.success(message)
} 