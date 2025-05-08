import API from './api';
import { toast } from 'react-toastify';

// Helper to format YouTube URLs to embeddable format
const formatYouTubeURL = (url) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
};

// Add a new video to a course (Mentor only)
export const addCourseVideo = async (courseId, videoData) => {
    try {
        const formattedUrl = formatYouTubeURL(videoData.url);

        if (!formattedUrl) {
            toast.error('Invalid YouTube URL');
            throw new Error('Invalid YouTube URL');
        }

        const response = await API.post('/videos', {
            course: courseId,
            title: videoData.title,
            url: formattedUrl
        });

        toast.success('Video added successfully!');
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || 'Failed to add video';
        toast.error(message);
        throw error;
    }
};


// Get all videos for a course
export const getCourseVideos = async (courseId) => {
    try {
        const response = await API.get(`/videos/${courseId}`);
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || 'Failed to fetch videos';
        toast.error(message);
        throw error;
    }
};

// Delete a video from a course
export const deleteCourseVideo = async (videoId) => {
    try {
        const response = await API.delete(`/videos/${videoId}`);
        toast.success('Video deleted successfully!');
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || 'Failed to delete video';
        toast.error(message);
        throw error;
    }
};

// Update a video
export const updateCourseVideo = async (videoId, videoData) => {
    try {
        const response = await API.put(`/videos/${videoId}`, videoData);
        toast.success('Video updated successfully!');
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || 'Failed to update video';
        toast.error(message);
        throw error;
    }
};