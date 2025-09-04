import { format } from 'date-fns';
import { FiUser, FiArrowRight, FiClock } from 'react-icons/fi';
import { motion } from 'framer-motion';

const BlogsCard = ({ blog, onClick }) => {
    return (
        <motion.div
            className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            {/* Image with hover effect */}
            <div className="relative h-48 w-full overflow-hidden">
                <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={blog.imageUrl || "/books.webp"}
                    alt={blog.title}
                    loading="lazy"
                    onError={(e) => {
                        e.target.src = "/books.webp"; // Fallback image
                    }}
                />
                {/* Category badge */}
                {blog.category && (
                    <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-800 shadow-sm">
                        {blog.category}
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="p-6 space-y-3">
                {/* Meta info */}
                <div className="flex justify-between items-center text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                        <FiUser className="text-gray-400" />
                        <span>{blog.author?.fullName || "Unknown Author"}</span>
                    </div>
                    {/* <div className="flex items-center gap-2">
                        <FiClock className="text-gray-400" />
                        <span>{blog.readTime || "5 min read"}</span>
                    </div> */}
                </div>

                {/* Date */}
                <div className="text-xs text-gray-400">
                    {format(new Date(blog.createdAt), 'MMMM d, yyyy')}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {blog.title || "Understanding React Hooks: A Comprehensive Guide"}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 line-clamp-3" title={blog.excerpt}>
                    {blog.excerpt || "A deep dive into React Hooks and how they can simplify your component logic..."}
                </p>

                {/* Read More button */}
                <button
                    className="flex items-center gap-1 mt-4 text-blue-600 font-medium hover:text-blue-800 transition-colors"
                    onClick={(e) => {
                        e.stopPropagation();
                        onClick();
                    }}
                >
                    <span>Read more</span>
                    <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                </button>
            </div>
        </motion.div>
    );
};

export default BlogsCard;