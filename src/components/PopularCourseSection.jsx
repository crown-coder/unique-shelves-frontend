import CourseCard from './CourseCard'
import { Link, useNavigate } from 'react-router-dom'
import { getAllCourses } from '../services/courseService';
import { useState, useEffect } from 'react';

const PopularCourseSection = () => {
    const [courses, setCourses] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        const fetCourses = async () => {
            try {
                const data = await getAllCourses()
                const shuffled = data.sort(() => 0.5 - Math.random())
                const selected = shuffled.slice(0, 4)
                setCourses(selected)
            } catch (error) {
                console.error('Failed to fetch courses: ', error)
            }
        }
        fetCourses()
    }, [])

    const handleCourseClick = (courseId) => {
        navigate(`/courses/${courseId}`);
    }

    return (
        <section className='min-h-dvh w-full mt-10 flex flex-col items-center'>
            <div className='w-full'>
                <h2 className='font-bold text-2xl'>Our Popular Courses</h2>
                <p>Grow your mind with our extraordinary courses</p>
            </div>

            <div className='w-full grid grid-cols-4 max-lg:grid-cols-1 gap-4 mt-4'>
                {courses.map((course) => (
                    <CourseCard
                        key={course._id}
                        id={course._id}
                        title={course.title}
                        description={course.description}
                        category={course.category}
                        mentor={course.mentor?.fullName || 'Unknown'}
                        rating={course.rating || 4.5}
                        onClick={() => handleCourseClick(course._id)}
                    />
                ))}
            </div>
            <Link className="mt-16 inline-block px-8 py-3 text-lg font-medium text-white bg-blue-400 rounded-full hover:bg-blue-600 transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
                View More →
            </Link>
        </section>
    )
}

export default PopularCourseSection