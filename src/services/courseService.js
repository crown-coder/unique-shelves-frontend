import API from './api';
import { toast } from 'react-toastify';

// Create a new course (Mentor only)
export const createCourse = async (courseData) => {
    try {
        const response = await API.post('/courses', courseData);
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || 'Failed to create course';
        toast.error(message);
        throw error;
    }
};

// Get mentor's courses (Mentor only)
export const getMyCourses = async () => {
    try {
        const response = await API.get('/courses/my-courses');
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || 'Failed to fetch your courses';
        toast.error(message);
        throw error;
    }
};

// Update a course (Mentor only)
export const updateCourse = async (courseId, updatedData) => {
    try {
        const response = await API.put(`/courses/${courseId}`, updatedData);
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || 'Failed to update course';
        toast.error(message);
        throw error;
    }
};

// Delete a course (Mentor only)
export const deleteCourse = async (courseId) => {
    try {
        const response = await API.delete(`/courses/${courseId}`);
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || 'Failed to delete course';
        toast.error(message);
        throw error;
    }
};