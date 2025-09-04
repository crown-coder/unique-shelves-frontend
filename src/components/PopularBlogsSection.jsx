import BlogsCard from './BlogsCard'
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAllBlogs } from '../services/blogService'

const PopularBlogsSection = () => {

    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const data = await getAllBlogs()
                const shuffled = data.sort(() => 0.5 - Math.random())
                const selected = shuffled.slice(0, 4)
                setBlogs(selected)
                console.log(selected)
            } catch (error) {
                console.error('Failed to fetch blogs: ', error)
            }
        }
        fetchBlogs()
    }, [])

    const handleBlogClick = (blogId) => {
        navigate(`/blogs/${blogId}`);
    }

    return (
        <section className='min-h-dvh w-full mt-10 flex flex-col items-center'>
            <div className='w-full'>
                <h2 className='font-bold text-2xl'>Our Popular Blogs</h2>
                <p>Grow your mind with our extraordinary blogs</p>
            </div>

            <div className='w-full grid grid-cols-4 max-lg:grid-cols-1 gap-6 mt-4'>
                {blogs.map((blog, index) => (
                    <BlogsCard key={index} blog={blog} onClick={() => handleBlogClick(blog._id)} />
                ))}

            </div>
            <Link to='/blogs' className="mt-16 inline-block px-8 py-3 text-lg font-medium text-white bg-blue-400 rounded-full hover:bg-blue-600 transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
                View More →
            </Link>

        </section>
    )
}

export default PopularBlogsSection
