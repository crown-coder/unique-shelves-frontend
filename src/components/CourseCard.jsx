import React from 'react'

const CourseCard = ({ onClick, title, description, category, mentor, rating }) => {
    return (
        <article className='bg-white p-3 rounded-xl' onClick={onClick}>
            <img src='/thumbnail.jpg' className='rounded-xl' />
            <div className='space-y-2'>
                <h4 className='font-bold text-lg'>{title}</h4>
                <p className='font-light text-gray-700'>{description}</p>
                <span className='py-1 px-2 rounded-full text-[12px] bg-blue-200 text-blue-600'>|{category}</span>
                <p className='mt-2 text-sm text-gray-600 italic'>By: {mentor}</p>
                <div className='flex justify-between items-center mt-2'>
                    <p className='text-sm'>Rating: <span className='italic text-gray-600'>({rating})</span></p>
                    <button className='px-3 py-1 rounded-full bg-blue-400 text-white cursor-pointer'>View Course</button>
                </div>
            </div>
        </article>
    )
}

export default CourseCard
