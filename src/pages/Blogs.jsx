import { useState, useEffect } from "react"
import NavBar from "../components/NavBar"
import BlogsCard from "../components/BlogsCard"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { getAllBlogs } from "../services/blogService"

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([])
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const blogPerPage = 8;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true);
                const response = await getAllBlogs();
                setBlogs(response)
                setFilteredBlogs(response)
                console.log(response)
            } catch (error) {
                toast.error("Failed to load blogs");
                console.error("Error fetching courses:", error);
                setBlogs([]);
                setFilteredBlogs([]);
            } finally {
                setLoading(false);
            }
        }

        fetchBlogs();
    }, []);

    // Filter Blogs based on search
    useEffect(() => {
        let result = [...blogs];

        if (searchTerm) {
            result = result.filter(blog =>
                blog?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                blog?.author?.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        setFilteredBlogs(result);
        setCurrentPage(1);

    }, [searchTerm, blogs])


    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const handleBlogClick = (blogId) => {
        navigate(`/blogs/${blogId}`);
    }

    // Pagination logic
    const indexOfLastBlog = currentPage * blogPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogPerPage;
    const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
    const totalPages = Math.ceil(filteredBlogs.length / blogPerPage);

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
        )
    }

    return (
        <main className="w-full min-h-dvh bg-gray-50">
            <div className="px-8 max-lg:px-2 pb-8">
                <NavBar />

                {/* Page Header */}
                <div className="my-8">
                    <h1 className="text-3xl font-bold text-gray-900">Explore Our Blogs</h1>
                    <p className="text-gray-600 mt-2">Find the perfect blogs to sharpen your brain and stay up to date</p>
                </div>

                {/* Search */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 bg-white p-4 rounded-lg shadow-sm">
                    {/* Search Bar */}
                    <div className="w-full md:w-1/3">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search Blogs..."
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
                </div>

                {/* Results count */}
                <div className="mb-4 text-gray-600">
                    {filteredBlogs.length} {filteredBlogs.length === 1 ? 'Blog' : 'Blogs'} found
                </div>

                {/* Blogs Grid */}
                {currentBlogs.length > 0 ? (
                    <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8'>
                        {currentBlogs.map((blog, index) => (
                            <BlogsCard
                                key={index} blog={blog} onClick={() => handleBlogClick(blog._id)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <h3 className="text-lg font-medium text-gray-700">No Blog found</h3>
                        <p className="text-gray-500 mt-2">Try adjusting your search criteria</p>
                    </div>
                )}

                {/* Pagination */}
                {filteredBlogs.length > blogPerPage && (
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
    )
}

export default Blogs
