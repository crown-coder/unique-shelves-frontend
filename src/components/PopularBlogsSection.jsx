import React from 'react'
import BlogsCard from './BlogsCard'
import { Link } from 'react-router-dom'

const PopularBlogsSection = () => {
    const blogs = [
        {
            title: "Getting Started with Next.js",
            excerpt: "Learn how to build server-rendered React applications with Next.js",
            date: "June 1, 2023",
            readTime: "8 min read",
            category: "Web Development"
        },
        {
            title: "Getting Started with Next.js",
            excerpt: "Learn how to build server-rendered React applications with Next.js",
            date: "June 1, 2023",
            readTime: "8 min read",
            category: "Web Development"
        },
        {
            title: "Getting Started with Next.js",
            excerpt: "Learn how to build server-rendered React applications with Next.js",
            date: "June 1, 2023",
            readTime: "8 min read",
            category: "Web Development"
        },
        {
            title: "Getting Started with Next.js",
            excerpt: "Learn how to build server-rendered React applications with Next.js",
            date: "June 1, 2023",
            readTime: "8 min read",
            category: "Web Development"
        },
        // ... more blog objects
    ];

    return (
        <section className='min-h-dvh w-full mt-10 flex flex-col items-center'>
            <div className='w-full'>
                <h2 className='font-bold text-2xl'>Our Popular Blogs</h2>
                <p>Grow your mind with our extraordinary blogs</p>
            </div>

            <div className='w-full grid grid-cols-4 max-lg:grid-cols-1 gap-6 mt-4'>
                {blogs.map((blog, index) => (
                    <BlogsCard key={index} blog={blog} />
                ))}

            </div>
            <Link className="mt-16 inline-block px-8 py-3 text-lg font-medium text-white bg-blue-400 rounded-full hover:bg-blue-600 transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
                View More →
            </Link>

        </section>
    )
}

export default PopularBlogsSection
