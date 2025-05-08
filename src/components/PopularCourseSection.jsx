import React from 'react'
import CourseCard from './CourseCard'
import { Link } from 'react-router-dom'

const PopularCourseSection = () => {
    return (
        <section className='min-h-dvh w-full mt-10 flex flex-col items-center'>
            <div className='w-full'>
                <h2 className='font-bold text-2xl'>Our Popular Courses</h2>
                <p>Grow your mind with our extraordinary courses</p>
            </div>

            <div className='w-full grid grid-cols-4 max-lg:grid-cols-1 gap-4 mt-4'>
                <CourseCard />
                <CourseCard />
                <CourseCard />
                <CourseCard />
            </div>
            <Link className="mt-16 inline-block px-8 py-3 text-lg font-medium text-white bg-blue-400 rounded-full hover:bg-blue-600 transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
                View More →
            </Link>
        </section>
    )
}

export default PopularCourseSection
