import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className='w-full h-[calc(100dvh-100px)] relative overflow-hidden rounded-xl shadow-2xl'>
      {/* Background Image with Loading Optimization */}
      <div className='absolute top-0 left-0 h-full w-full z-0'>
        {/* Blurred placeholder */}
        {!imageLoaded && (
          <div 
            className='absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 animate-pulse rounded-xl'
            style={{ backdropFilter: 'blur(20px)' }}
          />
        )}

        {/* Main Image */}
        <motion.img
          src='/back.webp'
          alt='Hero Background'
          className='object-cover h-full w-full rounded-xl'
          initial={{ opacity: 0 }}
          animate={{ opacity: imageLoaded ? 1 : 0 }}
          transition={{ duration: 0.6 }}
          onLoad={() => setImageLoaded(true)}
          loading='eager'
          decoding='async'
        />
      </div>

      {/* Overlay Content with Animations */}
      <div className='relative z-10 h-full w-full px-4 bg-gradient-to-r from-black/30 to-transparent flex flex-col gap-4 justify-center pl-[10%] max-lg:pl-5 text-white'>
        <motion.p
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className='text-lg md:text-xl mb-2 font-light'
        >
          Welcome to UniqueShelves
        </motion.p>

        <motion.h2
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className='text-4xl md:text-6xl font-bold leading-tight max-w-2xl'
        >
          Experience <br /> the Magic Of <br /> Digital Learning
        </motion.h2>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <button className='py-3 px-8 rounded-full text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-medium text-lg'>
            Explore Our Courses
          </button>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className='absolute bottom-8 right-8 z-10'>
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className='text-white/80'
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinecap="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;