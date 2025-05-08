import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FiPlay, FiTrash2, FiPlus, FiX, FiClock, FiLoader, FiEdit } from 'react-icons/fi';
import { getMyCourses } from '../../../services/courseService';
import {
    addCourseVideo,
    getCourseVideos,
    deleteCourseVideo,
    updateCourseVideo
} from '../../../services/videoService';
import { toast } from 'react-toastify';
import AddVideoModal from '../../AddVideoModal';
import EditVideoModal from '../../EditVideoModal';
import VideoPlayerModal from '../../VideoPlayerModal';

const CourseDetails = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Modal states
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showPlayerModal, setShowPlayerModal] = useState(false);
    const [currentVideo, setCurrentVideo] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    // Fetch course and videos
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const courses = await getMyCourses(); // returns all courses
                const courseData = courses.find((course) => course._id === id);
                if (!courseData) throw new Error("Course not found");

                setCourse(courseData);

                const videosData = await getCourseVideos(id);
                setVideos(videosData);
            } catch (err) {
                setError(err.message || "An error occurred");
                toast.error('Failed to load course details');
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchData();
    }, [id]);


    const handleAddVideo = async (videoData) => {
        setIsProcessing(true);
        try {
            const newVideo = await addCourseVideo(id, videoData);
            setVideos([...videos, newVideo]);
            toast.success('Video added successfully!');
            setShowAddModal(false);
        } catch (error) {
            // Error is already handled in the service
        } finally {
            setIsProcessing(false);
        }
    };

    const handleUpdateVideo = async (videoId, videoData) => {
        setIsProcessing(true);
        try {
            const updatedVideo = await updateCourseVideo(videoId, videoData);
            setVideos(videos.map(v => v._id === updatedVideo._id ? updatedVideo : v));
            toast.success('Video updated successfully!');
            setShowEditModal(false);
        } catch (error) {
            // Error is already handled in the service
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDeleteVideo = async (videoId) => {
        setIsProcessing(true);
        try {
            await deleteCourseVideo(videoId);
            setVideos(videos.filter(video => video._id !== videoId));
            toast.success('Video deleted successfully!');
        } catch (error) {
            // Error is already handled in the service
        } finally {
            setIsProcessing(false);
        }
    };

    const openEditModal = (video) => {
        setCurrentVideo(video);
        setShowEditModal(true);
    };

    const openPlayerModal = (video) => {
        setCurrentVideo(video);
        setShowPlayerModal(true);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <FiLoader className="animate-spin h-12 w-12 text-blue-500" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center p-8 bg-white rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Course</h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center p-8 bg-white rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Course Not Found</h2>
                    <p className="text-gray-600">The requested course doesn't exist or may have been removed.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full grid grid-cols-3 max-lg:grid-cols-1 gap-2 mt-2">
            {/* Course Header */}
            <div className="bg-white rounded-xl p-4 mb-6 col-span-1 h-fit">
                <div className="flex flex-col justify-between gap-6">
                    <div className="flex-1">
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full mb-4">
                            {course.category}
                        </span>
                        <h1 className="text-lg font-bold text-gray-900 mb-2">{course.title}</h1>
                        <p className="text-sm text-gray-600 mb-6">{course.description}</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className={`text-xl font-semibold ${course.price === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                            <p>
                                ₦{course?.price !== undefined ? course.price.toFixed(2) : '0.00'}
                            </p>

                        </span>
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                            disabled={isProcessing}
                        >
                            {isProcessing ? (
                                <FiLoader className="animate-spin" />
                            ) : (
                                <>
                                    <FiPlus />
                                    <span>Add Video</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Videos Section */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden col-span-2 max-lg:col-span-1">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Course Videos ({videos.length})
                    </h2>
                </div>

                {videos.length === 0 ? (
                    <div className="p-4 text-center">
                        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <FiPlay className="text-gray-400 text-3xl" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-1">No Videos Added</h3>
                        <p className="text-gray-500 mb-4">Add your first video to get started</p>
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            disabled={isProcessing}
                        >
                            <FiPlus className="mr-2" />
                            Add Video
                        </button>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-200 max-h-[550px] overflow-y-scroll">
                        {videos.map(video => (
                            <div key={video._id} className="p-4 hover:bg-gray-50 transition-colors">
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div
                                        className="relative w-full sm:w-20 h-16 rounded-lg overflow-hidden cursor-pointer bg-gray-200"
                                        onClick={() => openPlayerModal(video)}
                                    >
                                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                                            <div className="w-7 h-7 bg-white bg-opacity-80 rounded-full flex items-center justify-center">
                                                <FiPlay className="text-blue-600 text-xl" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-1 flex flex-col sm:flex-row gap-4">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-medium text-gray-900 mb-1">
                                                {video.title}
                                            </h3>
                                            <div className="flex items-center text-sm text-gray-500 mb-2">
                                                <FiClock className="mr-1" />
                                                <span>{video.duration || '0:00'}</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 justify-end">
                                            <button
                                                onClick={() => openEditModal(video)}
                                                className="text-blue-500 hover:text-blue-700 p-2 rounded-full hover:bg-blue-50 transition-colors"
                                                disabled={isProcessing}
                                            >
                                                <FiEdit />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteVideo(video._id)}
                                                className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                                                disabled={isProcessing}
                                            >
                                                <FiTrash2 />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modals */}
            <AddVideoModal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSave={handleAddVideo}
                courseId={id}
                isSubmitting={isProcessing}
            />

            <EditVideoModal
                isOpen={showEditModal}
                onClose={() => setShowEditModal(false)}
                video={currentVideo}
                onSave={handleUpdateVideo}
                isSubmitting={isProcessing}
            />

            <VideoPlayerModal
                isOpen={showPlayerModal}
                onClose={() => setShowPlayerModal(false)}
                video={currentVideo}
            />
        </div>
    );
};

export default CourseDetails;