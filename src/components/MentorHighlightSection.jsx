import React from 'react';
import { FaLinkedin, FaTwitter, FaChalkboardTeacher, FaStar, FaQuoteLeft } from 'react-icons/fa';

const MentorHighlightSection = () => {
    const mentors = [
        {
            name: "Dr. Sarah Chen",
            role: "Senior Data Scientist at Google",
            bio: "10+ years experience in machine learning and AI research. PhD in Computer Science from Stanford.",
            testimonial: "Teaching allows me to give back and help shape the next generation of data scientists.",
            rating: 4.9,
            courses: 12,
            students: 8500,
            image: "michael.webp",
            social: { linkedin: "#", twitter: "#" }
        },
        {
            name: "James Rodriguez",
            role: "Lead UX Designer at Apple",
            bio: "Product design expert with 8 years experience creating award-winning user experiences.",
            testimonial: "Seeing my students land design jobs at top companies is incredibly rewarding.",
            rating: 4.8,
            courses: 8,
            students: 6200,
            image: "james.webp",
            social: { linkedin: "#", twitter: "#" }
        },
        {
            name: "Priya Patel",
            role: "Senior Software Engineer at Netflix",
            bio: "Specializes in scalable backend systems and microservices architecture.",
            testimonial: "I break down complex engineering concepts into digestible lessons anyone can understand.",
            rating: 5.0,
            courses: 15,
            students: 11200,
            image: "david.webp",
            social: { linkedin: "#", twitter: "#" }
        }
    ];

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                        Learn From Industry Leaders
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Our mentors are top professionals from world-class companies who are passionate about teaching.
                    </p>
                </div>

                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                    {mentors.map((mentor, index) => (
                        <div key={index} className="bg-white rounded-xl overflow-hidden hover:shadow-xl transition duration-300">
                            {/* Mentor Image */}
                            <div className="relative">
                                <img
                                    src={mentor.image}
                                    alt={mentor.name}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-20" />
                                <div className="absolute bottom-4 left-4">
                                    <h3 className="text-xl font-bold text-white">{mentor.name}</h3>
                                    <p className="text-blue-200">{mentor.role}</p>
                                </div>
                            </div>

                            {/* Mentor Info */}
                            <div className="p-6">
                                <div className="flex items-center mb-4">
                                    <div className="flex items-center text-yellow-500 mr-4">
                                        <FaStar className="mr-1" />
                                        <span>{mentor.rating}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <FaChalkboardTeacher className="mr-1 text-blue-500" />
                                        <span>{mentor.courses} courses</span>
                                    </div>
                                </div>

                                <p className="text-gray-700 mb-4">{mentor.bio}</p>

                                {/* Testimonial */}
                                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                                    <FaQuoteLeft className="text-blue-300 mb-2" />
                                    <p className="text-gray-700 italic">{mentor.testimonial}</p>
                                </div>

                                {/* Stats */}
                                <div className="flex justify-between text-sm text-gray-500 mb-4">
                                    <span>👨‍🎓 {mentor.students.toLocaleString()} students</span>
                                    <span>⭐ {mentor.rating}/5 rating</span>
                                </div>

                                {/* Social Links */}
                                <div className="flex space-x-3">
                                    <a href={mentor.social.linkedin} className="text-blue-500 hover:text-blue-700">
                                        <FaLinkedin size={20} />
                                    </a>
                                    <a href={mentor.social.twitter} className="text-blue-400 hover:text-blue-600">
                                        <FaTwitter size={20} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-16">
                    <button className="px-8 py-3 bg-blue-400 text-white font-medium rounded-full hover:bg-blue-700 transition duration-300 hover:shadow-xl">
                        Meet All Our Instructors
                    </button>
                </div>
            </div>
        </section>
    );
};

export default MentorHighlightSection;