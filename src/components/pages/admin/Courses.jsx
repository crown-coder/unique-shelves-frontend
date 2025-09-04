import React, { useState, useEffect } from "react";
import { FaEye, FaEdit, FaTrash, FaSearch, FaFilter, FaPlus, FaDollarSign, FaUsers } from "react-icons/fa";

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        // Fetch courses from API (replace with real API call)
        setCourses([
            {
                _id: "1",
                title: "React for Beginners",
                description: "Learn React from scratch with hands-on projects",
                mentor: "John Doe",
                price: 49,
                enrolled: 120,
                status: "Published",
                category: "Web Development",
                createdAt: "2023-05-15",
                rating: 4.8
            },
            {
                _id: "2",
                title: "Node.js Masterclass",
                description: "Build scalable server-side applications with Node.js",
                mentor: "Jane Smith",
                price: 59,
                enrolled: 80,
                status: "Draft",
                category: "Backend Development",
                createdAt: "2023-04-22",
                rating: 4.6
            },
            {
                _id: "3",
                title: "Advanced JavaScript Patterns",
                description: "Master advanced JavaScript concepts and patterns",
                mentor: "Mike Johnson",
                price: 69,
                enrolled: 95,
                status: "Published",
                category: "Programming",
                createdAt: "2023-06-10",
                rating: 4.9
            },
        ]);
    }, []);

    // Filter courses based on search term
    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.mentor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handlers
    const handleView = (course) => {
        setSelectedCourse(course);
        setIsViewModalOpen(true);
    };

    const handleEdit = (course) => {
        setSelectedCourse(course);
        setIsEditModalOpen(true);
    };

    const handleDelete = (course) => {
        setSelectedCourse(course);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        setCourses(courses.filter((c) => c._id !== selectedCourse._id));
        setIsDeleteModalOpen(false);
    };

    return (
        <div className="p-6 bg-white rounded-lg my-2 min-h-screen">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Course Management</h2>
                    <p className="text-gray-500 mt-1">Manage all courses in your catalog</p>
                </div>
                <div className="mt-4 md:mt-0">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                        <FaPlus size={14} /> Create Course
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
                            placeholder="Search courses by title, mentor, or category..."
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

            {/* Courses Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mentor</th>
                                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enrolled</th>
                                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredCourses.map((course) => (
                                <tr key={course._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4">
                                        <div>
                                            <div className="font-medium text-gray-900">{course.title}</div>
                                            <div className="text-sm text-gray-500">{course.category}</div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="text-sm text-gray-900">{course.mentor}</div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-1 text-sm font-medium text-gray-900">
                                            <FaDollarSign size={12} className="text-gray-400" />
                                            {course.price}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-1 text-sm text-gray-900">
                                            <FaUsers size={12} className="text-gray-400" />
                                            {course.enrolled}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                                                ${course.status === "Published"
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-yellow-100 text-yellow-800"
                                                }`}
                                        >
                                            {course.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <button
                                                className="text-gray-400 hover:text-blue-500 transition-colors p-1.5 rounded-lg hover:bg-blue-50"
                                                onClick={() => handleView(course)}
                                                title="View details"
                                            >
                                                <FaEye size={16} />
                                            </button>
                                            <button
                                                className="text-gray-400 hover:text-yellow-500 transition-colors p-1.5 rounded-lg hover:bg-yellow-50"
                                                onClick={() => handleEdit(course)}
                                                title="Edit course"
                                            >
                                                <FaEdit size={16} />
                                            </button>
                                            <button
                                                className="text-gray-400 hover:text-red-500 transition-colors p-1.5 rounded-lg hover:bg-red-50"
                                                onClick={() => handleDelete(course)}
                                                title="Delete course"
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

                {filteredCourses.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-400 mb-2">No courses found</div>
                        <div className="text-gray-500 text-sm">Try adjusting your search criteria</div>
                    </div>
                )}
            </div>

            {/* View Modal */}
            {isViewModalOpen && selectedCourse && (
                <div className="fixed inset-0 bg-black/20 bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-xl font-semibold text-gray-800">Course Details</h2>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <div className="text-sm text-gray-500 mb-1">Course Title</div>
                                <div className="font-medium">{selectedCourse.title}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-500 mb-1">Mentor</div>
                                <div className="font-medium">{selectedCourse.mentor}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-500 mb-1">Price</div>
                                <div className="font-medium">${selectedCourse.price}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-500 mb-1">Students Enrolled</div>
                                <div className="font-medium">{selectedCourse.enrolled}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-500 mb-1">Status</div>
                                <div className="font-medium capitalize">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                                        ${selectedCourse.status === "Published"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-yellow-100 text-yellow-800"
                                        }`}>
                                        {selectedCourse.status}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-500 mb-1">Category</div>
                                <div className="font-medium">{selectedCourse.category}</div>
                            </div>
                            <div className="md:col-span-2">
                                <div className="text-sm text-gray-500 mb-1">Description</div>
                                <div className="font-medium text-gray-700">{selectedCourse.description}</div>
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
            {isEditModalOpen && selectedCourse && (
                <div className="fixed inset-0 bg-black/20 bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-xl font-semibold text-gray-800">Edit Course</h2>
                        </div>
                        <form className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
                                <input
                                    type="text"
                                    defaultValue={selectedCourse.title}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Mentor</label>
                                <input
                                    type="text"
                                    defaultValue={selectedCourse.mentor}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                                    <input
                                        type="number"
                                        defaultValue={selectedCourse.price}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                    <select
                                        defaultValue={selectedCourse.status}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    >
                                        <option value="Published">Published</option>
                                        <option value="Draft">Draft</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    defaultValue={selectedCourse.description}
                                    rows={3}
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
            {isDeleteModalOpen && selectedCourse && (
                <div className="fixed inset-0 bg-black/20 bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-xl font-semibold text-gray-800">Confirm Deletion</h2>
                        </div>
                        <div className="p-6">
                            <p className="text-gray-600">
                                Are you sure you want to delete <span className="font-semibold">"{selectedCourse.title}"</span>? This action cannot be undone.
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                                {selectedCourse.enrolled} students are enrolled in this course.
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
                                Delete Course
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Courses;