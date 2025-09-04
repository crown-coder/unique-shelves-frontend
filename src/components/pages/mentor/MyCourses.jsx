import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import DeleteCourseModal from '../../DeleteCourseModal';
import EditCourseModal from '../../EditCourseModal';
import AddCourseModal from '../../AddCourseModal';
import { createCourse, getMyCourses, updateCourse, deleteCourse } from '../../../services/courseService';
import { toast } from 'react-toastify';
import { FiLoader, FiPlus, FiEdit, FiTrash2, FiEye, FiTag, FiFileText } from 'react-icons/fi';

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
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg my-6">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <div className="ml-4">
                        <h3 className="text-sm font-medium text-red-800">Error loading courses</h3>
                        <p className="text-sm text-red-700 mt-1">{error}</p>
                        <button
                            onClick={fetchCourses}
                            className="mt-3 px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors text-sm font-medium"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 bg-white min-h-screen rounded-lg my-2">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">My Courses</h2>
                    <p className="text-gray-500 text-sm mt-1">Manage and organize your teaching materials</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg transition-colors flex items-center gap-2 font-medium"
                    disabled={isProcessing}
                >
                    {isProcessing ? (
                        <FiLoader className="animate-spin h-4 w-4" />
                    ) : (
                        <>
                            <FiPlus size={16} />
                            Add New Course
                        </>
                    )}
                </button>
            </div>

            {courses.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FiFileText className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-700 mb-2">No courses yet</h3>
                    <p className="text-gray-500 mb-6">Start by creating your first course to share your knowledge.</p>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg transition-colors flex items-center gap-2 mx-auto"
                    >
                        <FiPlus size={16} />
                        Create First Course
                    </button>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {courses.map((course) => (
                                    <tr key={course._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-900">{course.title}</h3>
                                                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{course.description}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {/* <FiTag className="mr-1" size={12} /> */}
                                                {course.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center text-sm font-medium">
                                                {/* <FiDollarSign className="text-gray-400 mr-1" size={14} /> */}
                                                {course.price === 0 ? (
                                                    <span className="text-green-600">Free</span>
                                                ) : (
                                                    <span>₦{course.price.toFixed(2)}</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${course.status === 'published'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {course.status || 'draft'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <Link
                                                    to={`/mentor-dashboard/course/${course._id}`}
                                                    className="text-blue-600 hover:text-blue-800 p-1.5 rounded-lg hover:bg-blue-50 transition-colors"
                                                    title="View Details"
                                                >
                                                    <FiEye size={16} />
                                                </Link>
                                                <button
                                                    onClick={() => {
                                                        setSelectedCourse(course);
                                                        setShowEditModal(true);
                                                    }}
                                                    className="text-green-600 hover:text-green-800 p-1.5 rounded-lg hover:bg-green-50 transition-colors"
                                                    title="Edit Course"
                                                    disabled={isProcessing}
                                                >
                                                    <FiEdit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setSelectedCourse(course);
                                                        setShowDeleteModal(true);
                                                    }}
                                                    className="text-red-600 hover:text-red-800 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                                                    title="Delete Course"
                                                    disabled={isProcessing}
                                                >
                                                    <FiTrash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
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