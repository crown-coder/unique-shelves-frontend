import API from './api';
import { toast } from 'react-toastify';


// Add a new product (Admin or Mentor)
export const addProduct = async (formData) => {
    try {
        const response = await API.post('/products', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        const message = error.response?.data?.msg || 'Failed to add product';
        toast.error(message);
        throw error;
    }
};


// Get all products (Public)
export const getAllProducts = async () => {
    try {
        const response = await API.get('/products/')
        return response.data;
    } catch (error) {
        const message = error.response?.data?.msg || 'Failed to fetch products';
        toast.error(message);
        throw error;
    }
};

// Get mentor's products (Mentor only)
export const getMyProducts = async () => {
    try {
        const response = await API.get('/products/my-products');
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || 'Failed to fetch your products';
        toast.error(message);
        throw error;
    }
}