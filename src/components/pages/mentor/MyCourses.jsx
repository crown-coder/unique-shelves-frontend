import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import DeleteCourseModal from '../../DeleteCourseModal';
import EditCourseModal from '../../EditCourseModal';
import AddCourseModal from '../../AddCourseModal';
import { createCourse, getMyCourses, updateCourse, deleteCourse } from '../../../services/courseService';
import { toast } from 'react-toastify';
import { FiLoader } from 'react-icons/fi';

const MyCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    // Fetch mentor's courses
    const fetchCourses = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getMyCourses();
            setCourses(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    // Create new course
    const handleSaveCourse = async (courseData) => {
        setIsProcessing(true);
        try {
            const dataToSend = {
                ...courseData,
                price: Number(courseData.price)
            };
            const newCourse = await createCourse(dataToSend);
            setCourses(prev => [newCourse, ...prev]);
            toast.success('Course created successfully!');
            setShowAddModal(false);
        } catch (error) {
            // Error is already handled in the service
        } finally {
            setIsProcessing(false);
        }
    };

    // Update existing course
    const handleEditCourse = async (courseId, updatedData) => {
        setIsProcessing(true);
        try {
            const updatedCourse = await updateCourse(courseId, updatedData);
            setCourses(courses.map(course =>
                course._id === courseId ? updatedCourse : course
            ));
            toast.success('Course updated successfully!');
            setShowEditModal(false);
        } catch (error) {
            // Error is already handled in the service
        } finally {
            setIsProcessing(false);
        }
    };

    // Delete course
    const handleDeleteCourse = async (courseId) => {
        setIsProcessing(true);
        try {
            await deleteCourse(courseId);
            setCourses(courses.filter(course => course._id !== courseId));
            toast.success('Course deleted successfully!');
            setShowDeleteModal(false);
        } catch (error) {
            // Error is already handled in the service
        } finally {
            setIsProcessing(false);
        }
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
            <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
                <div className="flex items-center">
                    <div className="flex-shrink-0 text-red-500">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-red-700">{error}</p>
                        <button
                            onClick={fetchCourses}
                            className="mt-2 text-sm text-red-600 hover:text-red-500 font-medium"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full mt-2">
            <div className="px-3 flex md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <h2 className="text-2xl font-semibold text-gray-800">My Courses</h2>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors flex items-center gap-2"
                    disabled={isProcessing}
                >
                    {isProcessing ? (
                        <FiLoader className="animate-spin h-4 w-4" />
                    ) : (
                        <span>Add New Course</span>
                    )}
                </button>
            </div>

            {courses.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow border border-gray-200">
                    <p className="text-gray-500 text-lg mb-4">You haven't created any courses yet.</p>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                    >
                        Create Your First Course
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {courses.map((course) => (
                        <div key={course._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{course.title}</h3>
                                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-md mb-3">
                                    {course.category}
                                </span>
                                <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>
                                <p className="font-medium">
                                    Price: {course.price === 0 ? (
                                        <span className="text-green-600">Free</span>
                                    ) : (
                                        <span>${course.price.toFixed(2)}</span>
                                    )}
                                </p>
                            </div>
                            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                                <div className="flex justify-between items-center">
                                    <Link
                                        to={`/mentor-dashboard/course/${course._id}`}
                                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                    >
                                        View Details
                                    </Link>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => {
                                                setSelectedCourse(course);
                                                setShowEditModal(true);
                                            }}
                                            className="text-green-600 hover:text-green-800 text-sm font-medium"
                                            disabled={isProcessing}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedCourse(course);
                                                setShowDeleteModal(true);
                                            }}
                                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                                            disabled={isProcessing}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modals */}
            <AddCourseModal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSave={handleSaveCourse}
                isSubmitting={isProcessing}
            />

            <EditCourseModal
                isOpen={showEditModal}
                course={selectedCourse}
                onClose={() => setShowEditModal(false)}
                onSave={handleEditCourse}
                isSubmitting={isProcessing}
            />

            <DeleteCourseModal
                isOpen={showDeleteModal}
                courseId={selectedCourse?._id}
                courseTitle={selectedCourse?.title}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteCourse}
                isDeleting={isProcessing}
            />
        </div>
    );
};

export default MyCourses;