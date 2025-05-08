import { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { updateCourseVideo } from '../services/videoService';

const EditVideoModal = ({ isOpen, onClose, video, onVideoUpdated }) => {
    const [videoData, setVideoData] = useState({
        title: '',
        url: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (video) {
            setVideoData({
                title: video.title,
                url: video.url
            });
        }
    }, [video]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVideoData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const updatedVideo = await updateCourseVideo(video._id, videoData);
            onVideoUpdated(updatedVideo);
            onClose();
        } catch (error) {
            // Error is already handled in the service
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen || !video) return null;

    return (
        <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-md">
                <div className="flex justify-between items-center p-4">
                    <h3 className="text-xl font-semibold">Edit Video</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                        disabled={isSubmitting}
                    >
                        <FiX size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Video Title *
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={videoData.title}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Video URL *
                        </label>
                        <input
                            type="url"
                            name="url"
                            value={videoData.url}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="flex justify-end space-x-2 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded-md"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditVideoModal;