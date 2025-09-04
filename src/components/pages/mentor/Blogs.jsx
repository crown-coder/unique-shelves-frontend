import { useState, useEffect } from 'react';
import DeleteBlogModal from '../../DeleteBlogModal';
import EditBlogModal from '../../EditBlogModal';
import AddBlogModal from '../../AddBlogModal';
import ViewBlogModal from '../../ViewBlogModal';
import { createBlog, getMyBlogs, updateBlog, deleteBlog } from '../../../services/blogService';
import { toast } from 'react-toastify';
import { FiLoader, FiEdit2, FiTrash2, FiEye, FiPlus } from 'react-icons/fi';
import { format } from 'date-fns';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    // Fetch blogs
    const fetchBlogs = async () => {
        try {
            setLoading(true);
            setError(null);
            const token = localStorage.getItem('token');
            const data = await getMyBlogs(token);
            setBlogs(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    // Create new blog
    const handleSaveBlog = async (blogData) => {
        setIsProcessing(true);
        try {
            const formData = new FormData();
            formData.append('title', blogData.title);
            formData.append('body', blogData.body);
            if (blogData.image) {
                formData.append('image', blogData.image);
            }

            const newBlog = await createBlog(formData, localStorage.getItem('token'));
            setBlogs(prev => [newBlog, ...prev]);
            toast.success('Blog created successfully!');
            setShowAddModal(false);
        } catch (error) {
            // Error is already handled in the service
        } finally {
            setIsProcessing(false);
        }
    };

    // Update existing blog
    const handleEditBlog = async (blogId, updatedData) => {
        setIsProcessing(true);
        try {
            const formData = new FormData();
            formData.append('title', updatedData.title);
            formData.append('body', updatedData.body);
            if (updatedData.image) {
                formData.append('image', updatedData.image);
            }

            const updatedBlog = await updateBlog(blogId, formData, localStorage.getItem('token'));
            setBlogs(blogs.map(blog =>
                blog._id === blogId ? updatedBlog : blog
            ));
            toast.success('Blog updated successfully!');
            setShowEditModal(false);
        } catch (error) {
            // Error is already handled in the service
        } finally {
            setIsProcessing(false);
        }
    };

    // Delete blog
    const handleDeleteBlog = async (blogId) => {
        setIsProcessing(true);
        try {
            await deleteBlog(blogId, localStorage.getItem('token'));
            setBlogs(blogs.filter(blog => blog._id !== blogId));
            toast.success('Blog deleted successfully!');
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
                            onClick={fetchBlogs}
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
        <div className="p-6 bg-white min-h-screen rounded-lg my-2">
            <div className="px-3 flex md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <h2 className="text-2xl font-semibold text-gray-800">My Blogs</h2>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors flex items-center gap-2"
                    disabled={isProcessing}
                >
                    <FiPlus className="h-4 w-4" />
                    <span>Add New Blog</span>
                </button>
            </div>

            {blogs.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow border border-gray-200">
                    <p className="text-gray-500 text-lg mb-4">You haven't created any blogs yet.</p>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors flex items-center gap-2 mx-auto"
                    >
                        <FiPlus className="h-4 w-4" />
                        Create Your First Blog
                    </button>
                </div>
            ) : (
                <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Title
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Created Date
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {blogs.map((blog) => (
                                    <tr key={blog._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                {blog.imageUrl && (
                                                    <div className="flex-shrink-0 h-10 w-10 mr-3">
                                                        <img className="h-10 w-10 rounded-md object-cover" src={blog.imageUrl} alt={blog.title} />
                                                    </div>
                                                )}
                                                <div className="text-sm font-medium text-gray-900 line-clamp-1">
                                                    {blog.title}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">
                                                {format(new Date(blog.createdAt), 'MMM d, yyyy')}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                Published
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end space-x-2">
                                                <button
                                                    onClick={() => {
                                                        setSelectedBlog(blog);
                                                        setShowViewModal(true);
                                                    }}
                                                    className="text-blue-600 hover:text-blue-900 p-1 rounded-md hover:bg-blue-50"
                                                    title="View"
                                                >
                                                    <FiEye className="h-5 w-5" />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setSelectedBlog(blog);
                                                        setShowEditModal(true);
                                                    }}
                                                    className="text-yellow-600 hover:text-yellow-900 p-1 rounded-md hover:bg-yellow-50"
                                                    title="Edit"
                                                    disabled={isProcessing}
                                                >
                                                    <FiEdit2 className="h-5 w-5" />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setSelectedBlog(blog);
                                                        setShowDeleteModal(true);
                                                    }}
                                                    className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50"
                                                    title="Delete"
                                                    disabled={isProcessing}
                                                >
                                                    <FiTrash2 className="h-5 w-5" />
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
            <AddBlogModal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSave={handleSaveBlog}
                isSubmitting={isProcessing}
            />

            <EditBlogModal
                isOpen={showEditModal}
                blog={selectedBlog}
                onClose={() => setShowEditModal(false)}
                onSave={handleEditBlog}
                isSubmitting={isProcessing}
            />

            <DeleteBlogModal
                isOpen={showDeleteModal}
                blogId={selectedBlog?._id}
                blogTitle={selectedBlog?.title}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteBlog}
                isDeleting={isProcessing}
            />

            <ViewBlogModal
                isOpen={showViewModal}
                blog={selectedBlog}
                onClose={() => setShowViewModal(false)}
            />
        </div>
    );
};

export default Blogs;