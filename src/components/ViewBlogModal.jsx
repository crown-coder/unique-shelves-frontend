import { FiX } from 'react-icons/fi';

const ViewBlogModal = ({ isOpen, onClose, blog }) => {
    if (!isOpen || !blog) return null;

    return (
        <div className="fixed inset-0 bg-black/20 bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl relative max-h-[90vh] overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    <FiX className="h-6 w-6" />
                </button>

                <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">{blog.title}</h2>

                    {blog.imageUrl && (
                        <div className="mb-6 rounded-lg overflow-hidden">
                            <img
                                src={blog.imageUrl}
                                alt={blog.title}
                                className="w-full h-auto max-h-96 object-cover"
                            />
                        </div>
                    )}

                    <div className="prose max-w-none">
                        <p className="whitespace-pre-line text-gray-700">{blog.body}</p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-200">
                        <div className="flex items-center justify-between text-sm text-gray-500">
                            <span>Created: {new Date(blog.createdAt).toLocaleDateString()}</span>
                            <span>Last Updated: {new Date(blog.updatedAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewBlogModal;