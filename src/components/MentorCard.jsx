import React from 'react';

const MentorCard = ({
    name,
    title,
    company,
    expertise,
    experience,
    rating,
    sessions,
    avatar,
    availability,
    rate,
    onBook
}) => {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {/* Mentor Header */}
            <div className="p-6 flex items-start space-x-4">
                <img
                    className="h-16 w-16 rounded-full object-cover border-2 border-blue-100"
                    src={avatar}
                    alt={name}
                />
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
                    <p className="text-gray-600">{title} at {company}</p>
                    <div className="mt-1 flex items-center">
                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="ml-1 text-gray-700">{rating} ({sessions} sessions)</span>
                    </div>
                </div>
            </div>

            {/* Expertise */}
            <div className="px-6 pb-2">
                <h4 className="text-sm font-medium text-gray-500">Expertise</h4>
                <div className="mt-1 flex flex-wrap gap-2">
                    {expertise.slice(0, 3).map((skill, index) => (
                        <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                            {skill}
                        </span>
                    ))}
                    {expertise.length > 3 && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            +{expertise.length - 3} more
                        </span>
                    )}
                </div>
            </div>

            {/* Details */}
            <div className="px-6 py-4 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-gray-500">Experience</p>
                        <p className="text-sm font-medium text-gray-900">{experience}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Rate</p>
                        <p className="text-sm font-medium text-gray-900">{rate}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Available</p>
                        <div className="flex space-x-1">
                            {availability.map((day, index) => (
                                <span key={index} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                    {day}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Button */}
            <div className="px-6 py-4 bg-gray-50">
                <button
                    onClick={onBook}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                >
                    Book Session
                </button>
            </div>
        </div>
    );
};

export default MentorCard;