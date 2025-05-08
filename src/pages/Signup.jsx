import React from 'react'
import SignupForm from '../components/SignupForm'
import { Link } from 'react-router-dom'

const Signup = () => {
    return (
        <main className='w-full h-dvh max-lg:h-[50px] grid grid-cols-2 max-lg:grid-cols-1 gap-3 p-3 relative'>
            <div className='h-full relative'>
                <div className='h-full'>
                    <img src='/books.webp' className='h-full rounded-4xl' />
                </div>
                <div className='absolute p-5 bg-black/20 w-full h-full top-0 left-0 rounded-4xl'>
                    <header className='flex justify-between items-center'>
                        <h1 className='text-2xl font-light text-white'>Unique<span className='font-bold'>Shelves</span></h1>
                        <button className='py-2 px-6 rounded-full border-2 border-white text-white cursor-pointer'>
                            <Link to="/login">
                                Login
                            </Link>
                        </button>
                    </header>
                </div>
            </div>
            <div className='flex flex-col items-center justify-center max-lg:absolute max-lg:top-[90px] max-lg:bg-white max-lg:rounded-4xl max-lg:w-full max-lg:p-5'>
                <SignupForm />
            </div>
        </main>
    )
}

export default Signup
