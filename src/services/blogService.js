import API from './api';
import { toast } from 'react-toastify';

// Get all blogs (public)
export const getAllBlogs = async () => {
    const res = await API.get('/blogs');
    return res.data;
};

// ✅ Get blogs created by logged-in mentor/admin
export const getMyBlogs = async (token) => {
    const res = await API.get('/blogs/my-blogs', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res.data;
};

// Get Blog By ID
export const getBlogById = async (id) => {
    try {
        const response = await API.get(`/blogs/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch blog')
    }
}

// Create blog
export const createBlog = async (formData, token) => {
    const res = await API.post('/blogs', formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    });

    toast.success('Blog created successfully');
    return res.data;
};

// Update blog
export const updateBlog = async (id, formData, token) => {
    const res = await API.put(`/blogs/${id}`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    });

    toast.success('Blog updated');
    return res.data;
};


// Delete blog
export const deleteBlog = async (id, token) => {
    const res = await API.delete(`/blogs/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    toast.success('Blog deleted');
    return res.data;
};
