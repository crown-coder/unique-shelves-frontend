import { FiStar, FiUser, FiArrowRight } from 'react-icons/fi';

const CourseCard = ({
    onClick,
    title,
    description,
    category,
    instructor,
    price,
    rating,
    maxDescriptionLength = 100 // Default to 100 characters
}) => {
    // Function to slice description
    const truncateDescription = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    return (
        <article
            className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group"
            onClick={onClick}
        >
            {/* Course Thumbnail */}
            <div className="relative overflow-hidden h-48">
                <img
                    src='/thumbnail.jpg'
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">
                    {category}
                </div>
            </div>

            {/* Course Content */}
            <div className="p-5 space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                    <FiStar className="fill-current" />
                    <span className="text-sm font-medium text-gray-700">{rating || '4.8'}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {title}
                </h3>

                <p className="text-gray-600 line-clamp-3" title={description}>
                    {truncateDescription(description, maxDescriptionLength)}
                </p>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <FiUser className="text-gray-400" />
                    <span>{instructor}</span>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    <div className="font-bold text-lg text-gray-900">
                        ₦{price.toLocaleString()}
                    </div>
                    <button
                        className="flex items-center gap-1 px-4 py-2 bg-blue-400 hover:bg-blue-700 text-white rounded-lg transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                            onClick();
                        }}
                    >
                        <span>View</span>
                        <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                    </button>
                </div>
            </div>
        </article>
    );
};

export default CourseCard;