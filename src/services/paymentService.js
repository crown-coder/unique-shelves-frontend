import API from './api';
import { toast } from 'react-toastify';

export const initiatePayment = async ({ email, courseId }) => {
    try {
        const response = await API.post('/payment/pay', {
            studentEmail: email,
            courseId
        });
        return response.data.link; // This should be Monnify's checkout URL
    } catch (error) {
        console.log("Full error object:", error);
        console.log("error.response:", error.response);
        console.log("error.response.data:", error.response?.data);

        const message =
            error.response?.data?.msg ||
            error.response?.data?.message ||  // sometimes APIs use `message` instead of `msg`
            error.message ||
            'Failed to initiate payment';

        toast.error(message);
        throw error;
    }

};
