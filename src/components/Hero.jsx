import React from 'react';

const Hero = () => {
    return (
        <div className='w-full h-[calc(100dvh-100px)] relative overflow-hidden rounded-xl'>
            {/* Background Image */}
            <div className='absolute top-0 left-0 h-full w-full z-0'>
                <img
                    src='/back.webp'
                    alt='Hero Background'
                    className='object-cover h-full w-full rounded-xl'
                />
            </div>

            {/* Overlay Content */}
            <div className='relative z-10 h-full w-full px-4 bg-white/10 flex flex-col gap-2 justify-center pl-30 max-lg:pl-5 text-gray-800'>
                <p className='text-lg md:text-xl mb-2'>Welcome to UniqueShelves</p>
                <h2 className='text-3xl md:text-4xl font-bold leading-tight'>
                    Experience <br /> the Magic Of <br /> Digital Learning
                </h2>
                <button className='py-2 px-6 rounded-full text-white bg-blue-400 cursor-pointer w-fit'>Explore Our Courses</button>
            </div>
        </div>
    );
};

export default Hero;
