import React from 'react'
import NavBar from "../components/NavBar";
import CourseCard from '../components/CourseCard';

const Courses = () => {
    // Sample course data - in a real app this would come from an API
    const courses = [
        {
            id: 1,
            title: "Introduction to React",
            instructor: "Jane Smith",
            duration: "8 hours",
            level: "Beginner",
            rating: 4.7,
            students: 1250,
            thumbnail: "/react-course.jpg",
            category: "Web Development"
        },
        {
            id: 2,
            title: "Advanced JavaScript Patterns",
            instructor: "John Doe",
            duration: "12 hours",
            level: "Advanced",
            rating: 4.9,
            students: 850,
            thumbnail: "/js-course.jpg",
            category: "Web Development"
        },
        {
            id: 1,
            title: "Introduction to React",
            instructor: "Jane Smith",
            duration: "8 hours",
            level: "Beginner",
            rating: 4.7,
            students: 1250,
            thumbnail: "/react-course.jpg",
            category: "Web Development"
        },
        {
            id: 2,
            title: "Advanced JavaScript Patterns",
            instructor: "John Doe",
            duration: "12 hours",
            level: "Advanced",
            rating: 4.9,
            students: 850,
            thumbnail: "/js-course.jpg",
            category: "Web Development"
        }, {
            id: 1,
            title: "Introduction to React",
            instructor: "Jane Smith",
            duration: "8 hours",
            level: "Beginner",
            rating: 4.7,
            students: 1250,
            thumbnail: "/react-course.jpg",
            category: "Web Development"
        },
        {
            id: 2,
            title: "Advanced JavaScript Patterns",
            instructor: "John Doe",
            duration: "12 hours",
            level: "Advanced",
            rating: 4.9,
            students: 850,
            thumbnail: "/js-course.jpg",
            category: "Web Development"
        }, {
            id: 1,
            title: "Introduction to React",
            instructor: "Jane Smith",
            duration: "8 hours",
            level: "Beginner",
            rating: 4.7,
            students: 1250,
            thumbnail: "/react-course.jpg",
            category: "Web Development"
        },
        {
            id: 2,
            title: "Advanced JavaScript Patterns",
            instructor: "John Doe",
            duration: "12 hours",
            level: "Advanced",
            rating: 4.9,
            students: 850,
            thumbnail: "/js-course.jpg",
            category: "Web Development"
        },
        // Add more courses as needed
    ];

    const categories = ["All", "Web Development", "Data Science", "Mobile Development", "Design", "Business"];

    return (
        <main className="w-full min-h-dvh">
            <div className="px-8 max-lg:px-2">
                <NavBar />

                {/* Page Header */}
                <div className="my-8">
                    <h1 className="text-3xl font-bold text-gray-900">Explore Our Courses</h1>
                    <p className="text-gray-600 mt-2">Find the perfect course to advance your skills</p>
                </div>

                {/* Search and Filter Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    {/* Search Bar */}
                    <div className="w-full md:w-1/3">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search courses..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Courses Grid */}
                <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8'>
                    {courses.map(course => (
                        <CourseCard
                            key={course.id}
                            title={course.title}
                            instructor={course.instructor}
                            duration={course.duration}
                            level={course.level}
                            rating={course.rating}
                            students={course.students}
                            thumbnail={course.thumbnail}
                            category={course.category}
                        />
                    ))}
                </div>

                {/* Pagination (if needed) */}
                <div className="flex justify-center my-8">
                    <nav className="flex items-center gap-1">
                        <button className="px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
                            Previous
                        </button>
                        <button className="px-3 py-1 rounded-md border border-blue-500 bg-blue-500 text-white">
                            1
                        </button>
                        <button className="px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
                            2
                        </button>
                        <button className="px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
                            3
                        </button>
                        <button className="px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
                            Next
                        </button>
                    </nav>
                </div>
            </div>
        </main>
    )
}

export default Courses