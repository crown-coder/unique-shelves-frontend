import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import { FiBookOpen } from 'react-icons/fi';
import { getMyCourses } from '../services/paidService';
import NavBar from '../components/NavBar';

const MyCoursesStudent = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('all');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEnrolledCourses = async () => {
            try {
                setLoading(true);
                const response = await getMyCourses();

                console.log("the data response", response.data)

                // Transform API data to only include needed fields
                const formattedCourses = response.data.data.map(course => ({
                    id: course._id,
                    title: course.title,
                    instructor: course.instructor,
                    duration: course.duration,
                    rating: course.rating,
                    category: course.category,
                    // Add default thumbnail if needed
                    thumbnail: course.thumbnail || 'https://via.placeholder.com/300x200?text=Course'
                }));

                setCourses(formattedCourses);
                setError(null);
            } catch (err) {
                console.error('Error fetching courses:', err);
                setError('Failed to load courses. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchEnrolledCourses();
    }, []);

    const handleCourseClick = (courseId) => {
        navigate(`/my-courses/${courseId}`);
    };

    return (
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
            <NavBar />
            <div className="mb-8 mt-3">
                <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
                <p className="mt-2 text-gray-600">Your learning journey</p>
            </div>

            {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    </div>
                </div>
            )}

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : courses.length === 0 ? (
                <div className="text-center py-12">
                    <FiBookOpen className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">
                        No courses enrolled yet
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                        Get started by enrolling in a new course.
                    </p>
                    <div className="mt-6">
                        <Link
                            to="/courses"
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                        >
                            Browse Courses
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => (
                        <CourseCard
                            key={course.id}
                            title={course.title}
                            instructor={course.instructor}
                            duration={course.duration}
                            rating={course.rating}
                            thumbnail={course.thumbnail}
                            category={course.category}
                            onClick={() => handleCourseClick(course.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyCoursesStudent;