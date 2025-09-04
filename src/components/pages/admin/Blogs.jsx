import React, { useState } from "react";
import { FaEye, FaEdit, FaTrash, FaSearch, FaFilter, FaPlus, FaCalendar, FaUser, FaFileAlt } from "react-icons/fa";

const Blogs = () => {
    const [blogs, setBlogs] = useState([
        {
            id: 1,
            title: "Understanding React Hooks",
            author: "John Doe",
            createdAt: "2025-08-10",
            status: "Published",
            content: "React Hooks are a powerful feature that allows you to use state and other React features without writing classes. They were introduced in React 16.8 and have revolutionized how we write React components.",
            category: "React",
            readTime: "5 min read"
        },
        {
            id: 2,
            title: "Mastering Node.js for APIs",
            author: "Jane Smith",
            createdAt: "2025-08-15",
            status: "Draft",
            content: "Node.js has become the go-to runtime environment for building scalable and efficient APIs. Its non-blocking I/O model makes it perfect for handling multiple requests simultaneously.",
            category: "Node.js",
            readTime: "8 min read"
        },
        {
            id: 3,
            title: "CSS Grid vs Flexbox",
            author: "Mike Johnson",
            createdAt: "2025-08-18",
            status: "Published",
            content: "Understanding when to use CSS Grid and when to use Flexbox is crucial for modern web layout design. While both are powerful, they serve different purposes in responsive design.",
            category: "CSS",
            readTime: "6 min read"
        },
    ]);

    const [selectedBlog, setSelectedBlog] = useState(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    // Filter blogs based on search term
    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleView = (blog) => {
        setSelectedBlog(blog);
        setIsViewModalOpen(true);
    };

    const handleEdit = (blog) => {
        setSelectedBlog(blog);
        setIsEditModalOpen(true);
    };

    const handleDelete = (blog) => {
        setSelectedBlog(blog);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        setBlogs(blogs.filter((b) => b.id !== selectedBlog.id));
        setIsDeleteModalOpen(false);
        setSelectedBlog(null);
    };

    return (
        <div className="p-6 bg-white rounded-lg my-2 min-h-screen">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Blog Management</h2>
                    <p className="text-gray-500 mt-1">Manage and publish your blog content</p>
                </div>
                <div className="mt-4 md:mt-0">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                        <FaPlus size={14} /> New Blog Post
                    </button>
                </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaSearch className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search blogs by title, author, or category..."
                            className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                        <FaFilter className="text-gray-500" />
                        Filters
                    </button>
                </div>
            </div>

            {/* Blogs Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blog Post</th>
                                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredBlogs.map((blog) => (
                                <tr key={blog.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4">
                                        <div>
                                            <div className="font-medium text-gray-900">{blog.title}</div>
                                            <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                                                <FaFileAlt size={12} className="text-gray-400" />
                                                {blog.category} • {blog.readTime}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-900">
                                            <FaUser size={12} className="text-gray-400" />
                                            {blog.author}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <FaCalendar size={12} className="text-gray-400" />
                                            {blog.createdAt}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                                                ${blog.status === "Published"
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-yellow-100 text-yellow-800"
                                                }`}
                                        >
                                            {blog.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <button
                                                className="text-gray-400 hover:text-blue-500 transition-colors p-1.5 rounded-lg hover:bg-blue-50"
                                                onClick={() => handleView(blog)}
                                                title="View details"
                                            >
                                                <FaEye size={16} />
                                            </button>
                                            <button
                                                className="text-gray-400 hover:text-yellow-500 transition-colors p-1.5 rounded-lg hover:bg-yellow-50"
                                                onClick={() => handleEdit(blog)}
                                                title="Edit blog"
                                            >
                                                <FaEdit size={16} />
                                            </button>
                                            <button
                                                className="text-gray-400 hover:text-red-500 transition-colors p-1.5 rounded-lg hover:bg-red-50"
                                                onClick={() => handleDelete(blog)}
                                                title="Delete blog"
                                            >
                                                <FaTrash size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredBlogs.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-400 mb-2">No blog posts found</div>
                        <div className="text-gray-500 text-sm">Try adjusting your search criteria</div>
                    </div>
                )}
            </div>

            {/* View Modal */}
            {isViewModalOpen && selectedBlog && (
                <div className="fixed inset-0 bg-black/20 bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-xl font-semibold text-gray-800">Blog Post Details</h2>
                        </div>
                        <div className="p-6 space-y-6">
                            <div>
                                <div className="text-sm text-gray-500 mb-1">Title</div>
                                <div className="font-medium text-lg">{selectedBlog.title}</div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <div className="text-sm text-gray-500 mb-1">Author</div>
                                    <div className="font-medium flex items-center gap-2">
                                        <FaUser size={14} className="text-gray-400" />
                                        {selectedBlog.author}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500 mb-1">Publish Date</div>
                                    <div className="font-medium flex items-center gap-2">
                                        <FaCalendar size={14} className="text-gray-400" />
                                        {selectedBlog.createdAt}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500 mb-1">Status</div>
                                    <div className="font-medium">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                                            ${selectedBlog.status === "Published"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-yellow-100 text-yellow-800"
                                            }`}>
                                            {selectedBlog.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <div className="text-sm text-gray-500 mb-1">Category</div>
                                    <div className="font-medium">{selectedBlog.category}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500 mb-1">Read Time</div>
                                    <div className="font-medium">{selectedBlog.readTime}</div>
                                </div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-500 mb-1">Content Preview</div>
                                <div className="font-medium text-gray-700 bg-gray-50 p-4 rounded-lg">
                                    {selectedBlog.content}
                                </div>
                            </div>
                        </div>
                        <div className="p-6 border-t border-gray-100 flex justify-end">
                            <button
                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                                onClick={() => setIsViewModalOpen(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {isEditModalOpen && selectedBlog && (
                <div className="fixed inset-0 bg-black/20 bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-xl font-semibold text-gray-800">Edit Blog Post</h2>
                        </div>
                        <form className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input
                                    type="text"
                                    defaultValue={selectedBlog.title}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                                <input
                                    type="text"
                                    defaultValue={selectedBlog.author}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                    <input
                                        type="text"
                                        defaultValue={selectedBlog.category}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                    <select
                                        defaultValue={selectedBlog.status}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    >
                                        <option value="Published">Published</option>
                                        <option value="Draft">Draft</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                                <textarea
                                    defaultValue={selectedBlog.content}
                                    rows={4}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                />
                            </div>
                        </form>
                        <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
                            <button
                                type="button"
                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                                onClick={() => setIsEditModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {isDeleteModalOpen && selectedBlog && (
                <div className="fixed inset-0 bg-black/20 bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-xl font-semibold text-gray-800">Confirm Deletion</h2>
                        </div>
                        <div className="p-6">
                            <p className="text-gray-600">
                                Are you sure you want to delete <span className="font-semibold">"{selectedBlog.title}"</span>? This action cannot be undone.
                            </p>
                        </div>
                        <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
                            <button
                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                                onClick={() => setIsDeleteModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                onClick={confirmDelete}
                            >
                                Delete Post
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Blogs;