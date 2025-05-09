import React from 'react'
import NavBar from '../components/NavBar';
import MentorCard from '../components/MentorCard'

const Mentors = () => {
    // Sample mentor data
    const mentors = [
        {
            id: 1,
            name: "Sarah Johnson",
            title: "Senior Software Engineer",
            company: "Google",
            expertise: ["React", "Node.js", "System Design"],
            experience: "8 years",
            rating: 4.9,
            sessions: 245,
            avatar: "/david.webp",
            availability: ["Mon", "Wed", "Fri"],
            rate: "$75/hour"
        },
        {
            id: 2,
            name: "Michael Chen",
            title: "Data Science Lead",
            company: "Amazon",
            expertise: ["Python", "Machine Learning", "Data Visualization"],
            experience: "6 years",
            rating: 4.8,
            sessions: 180,
            avatar: "/michael.webp",
            availability: ["Tue", "Thu", "Sat"],
            rate: "$90/hour"
        },
        // Add more mentors as needed
    ];

    const expertiseOptions = [
        "All",
        "React",
        "Node.js",
        "Python",
        "Machine Learning",
        "System Design",
        "Data Science",
        "UI/UX"
    ];

    return (
        <div className="min-h-screen">
            <div className="px-2 max-lg:px-2">
                <NavBar />
                {/* Page Header */}
                <div className="">
                    <div className="w-full mx-auto px-4 py-8 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold text-gray-900">Find Your Mentor</h1>
                        <p className="mt-2 text-lg text-gray-600">
                            Connect with industry experts for personalized guidance and career growth
                        </p>
                    </div>
                </div>

                {/* Main Content */}
                <main className="w-full mx-auto px-4 py-8 sm:px-6 lg:px-8">
                    {/* Search and Filter Section */}
                    <div className="mb-8">
                        <div className="flex flex-col md:flex-row gap-4 mb-6">
                            {/* Search Bar */}
                            <div className="flex-1">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search mentors by name, company, or expertise..."
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Expertise Filter */}
                            <div className="w-full md:w-64">
                                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    {expertiseOptions.map((expertise) => (
                                        <option key={expertise} value={expertise}>{expertise}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <div>
                                <span className="font-medium text-gray-900">{mentors.length}</span> mentors available
                            </div>
                            <div>
                                <span className="font-medium text-gray-900">4.8</span> average rating
                            </div>
                            <div>
                                <span className="font-medium text-gray-900">98%</span> satisfaction rate
                            </div>
                        </div>
                    </div>

                    {/* Mentors Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {mentors.map((mentor) => (
                            <MentorCard
                                key={mentor.id}
                                name={mentor.name}
                                title={mentor.title}
                                company={mentor.company}
                                expertise={mentor.expertise}
                                experience={mentor.experience}
                                rating={mentor.rating}
                                sessions={mentor.sessions}
                                avatar={mentor.avatar}
                                availability={mentor.availability}
                                rate={mentor.rate}
                                onBook={() => console.log(`Booking ${mentor.name}`)}
                            />
                        ))}
                    </div>


                    {/* Booking Modal (would be conditionally rendered) */}
                    {/* <BookingModal mentor={selectedMentor} onClose={() => setSelectedMentor(null)} /> */}
                </main>
            </div>
        </div>
    )
}

export default Mentors