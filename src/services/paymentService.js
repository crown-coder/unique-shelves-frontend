import API from './api';
import { toast } from 'react-toastify';

// Initiate a payment (Student)
export const initiatePayment = async ({ email, courseId }) => {
    try {
        const response = await API.post('/payment/pay', {
            studentEmail: email, // send email as studentEmail
            courseId
        });
        return response.data.link; // Flutterwave payment link
    } catch (error) {
        const message = error.response?.data?.msg || 'Failed to initiate payment';
        toast.error(message);
        throw error;
    }
};
