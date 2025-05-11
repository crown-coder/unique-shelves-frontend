import { useState, useEffect } from 'react';
import NavBar from "../components/NavBar";
import CourseCard from '../components/CourseCard';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAllCourses } from '../services/courseService';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 8;

    const categories = ["All", "Web Development", "Data Science", "Mobile Development", "Design", "Business"];
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true);
                const response = await getAllCourses();
                setCourses(response);
                setFilteredCourses(response);
            } catch (error) {
                toast.error("Failed to load courses");
                console.error("Error fetching courses:", error);
                setCourses([]);
                setFilteredCourses([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    // Filter courses based on search and category
    useEffect(() => {
        let results = [...courses];

        if (searchTerm) {
            results = results.filter(course =>
                course?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                course?.instructor?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedCategory !== 'All') {
            results = results.filter(course => course?.category === selectedCategory);
        }

        setFilteredCourses(results);
        setCurrentPage(1); // Reset to first page when filters change
    }, [searchTerm, selectedCategory, courses]);

    const handleCourseClick = (courseId) => {
        navigate(`/courses/${courseId}`);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    // Pagination logic
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
    const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) {
        return (
            <main className="w-full min-h-dvh">
                <NavBar />
                <div className="px-8 max-lg:px-2 py-8">
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="w-full min-h-dvh bg-gray-50">
            <div className="px-8 max-lg:px-2 pb-8">
                <NavBar />

                {/* Page Header */}
                <div className="my-8">
                    <h1 className="text-3xl font-bold text-gray-900">Explore Our Courses</h1>
                    <p className="text-gray-600 mt-2">Find the perfect course to advance your skills</p>
                </div>

                {/* Search and Filter Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 bg-white p-4 rounded-lg shadow-sm">
                    {/* Search Bar */}
                    <div className="w-full md:w-1/3">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search courses..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                            <button className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className="w-full md:w-auto">
                        <select
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                        >
                            {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Results count */}
                <div className="mb-4 text-gray-600">
                    {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'} found
                </div>

                {/* Courses Grid */}
                {currentCourses.length > 0 ? (
                    <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8'>
                        {currentCourses.map(course => (
                            <CourseCard
                                key={course._id}
                                id={course._id}
                                title={course.title}
                                description={course.description}
                                category={course.category}
                                instructor={course.instructor || course.mentor} // Handle both instructor/mentor naming
                                rating={course.rating}
                                thumbnail={course.thumbnail}
                                onClick={() => handleCourseClick(course._id)} // Fixed to use _id
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <h3 className="text-lg font-medium text-gray-700">No courses found</h3>
                        <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
                    </div>
                )}

                {/* Pagination */}
                {filteredCourses.length > coursesPerPage && (
                    <div className="flex justify-center my-8">
                        <nav className="flex items-center gap-1">
                            <button
                                onClick={() => paginate(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                                className="px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>

                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                let pageNum;
                                if (totalPages <= 5) {
                                    pageNum = i + 1;
                                } else if (currentPage <= 3) {
                                    pageNum = i + 1;
                                } else if (currentPage >= totalPages - 2) {
                                    pageNum = totalPages - 4 + i;
                                } else {
                                    pageNum = currentPage - 2 + i;
                                }

                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => paginate(pageNum)}
                                        className={`px-3 py-1 rounded-md border ${currentPage === pageNum
                                            ? 'border-blue-500 bg-blue-500 text-white'
                                            : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                                            }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}

                            {totalPages > 5 && currentPage < totalPages - 2 && (
                                <span className="px-2">...</span>
                            )}

                            {totalPages > 5 && currentPage < totalPages - 2 && (
                                <button
                                    onClick={() => paginate(totalPages)}
                                    className={`px-3 py-1 rounded-md border ${currentPage === totalPages
                                        ? 'border-blue-500 bg-blue-500 text-white'
                                        : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    {totalPages}
                                </button>
                            )}

                            <button
                                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </nav>
                    </div>
                )}
            </div>
        </main>
    );
};

export default Courses;