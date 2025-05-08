import React from 'react'

const CourseCard = () => {
    return (
        <article className='bg-white p-3 rounded-xl'>
            <img src='/sample1.jpg' className='rounded-xl' />
            <div className='space-y-2'>
                <h4 className='font-bold text-lg'>Web Development</h4>
                <p className='font-light text-gray-700'>All u need to know to get started with web deelopement...</p>
                <span className='py-1 px-2 rounded-full text-[12px] bg-blue-200 text-blue-600'>Web Development</span>
                <div className='flex justify-between items-center mt-2'>
                    <p className='text-sm'>Rating: <span className='italic text-gray-600'>(4.5)</span></p>
                    <button className='px-3 py-1 rounded-full bg-blue-400 text-white cursor-pointer'>View Course</button>
                </div>
            </div>
        </article>
    )
}

export default CourseCard
