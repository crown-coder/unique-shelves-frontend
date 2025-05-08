import React from 'react';

const BlogsCard = ({ blog }) => {
    return (
        <div className="bg-white rounded-lg overflow-hidden hover:shadow-xl transition duration-300">
            <div className="relative">
                <img
                    className="w-full h-48 object-cover"
                    src={blog.imageUrl || "/books.webp"}
                    alt={blog.title}
                />
                <span className="absolute top-3 left-3 bg-blue-200 text-blue-600 text-xs px-2 py-1 rounded">
                    {blog.category || "Technology"}
                </span>
            </div>

            <div className="p-5">
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span>{blog.date || "May 5, 2023"}</span>
                    <span>{blog.readTime || "7 min read"}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-3 hover:text-blue-600 cursor-pointer">
                    {blog.title || "Understanding React Hooks: A Comprehensive Guide"}
                </h3>

                <p className="text-gray-600 mb-4">
                    {blog.excerpt || "A deep dive into React Hooks and how they can simplify your component logic..."}
                </p>

                <button className="text-blue-400 font-medium hover:text-blue-600 transition cursor-pointer">
                    Read More →
                </button>
            </div>
        </div>
    );
};

export default BlogsCard
