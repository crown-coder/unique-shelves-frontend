import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FiPlay, FiLock, FiCheckCircle, FiClock, FiBarChart2 } from 'react-icons/fi';

const MyCoursesDetails = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [currentVideo, setCurrentVideo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mock data fetch - replace with actual API call
        const fetchData = async () => {
            try {
                const mockCourse = {
                    id: courseId,
                    title: 'Advanced React Patterns',
                    instructor: 'Jane Smith',
                    description: 'Master advanced React concepts and patterns to build scalable applications.',
                    thumbnail: 'https://via.placeholder.com/800x450',
                    progress: 45,
                    duration: '8 hours',
                    videos: [
                        {
                            id: '1',
                            title: 'Introduction to Advanced React',
                            duration: '12:45',
                            youtubeId: 'dQw4w9WgXcQ',
                            completed: true,
                        },
                        {
                            id: '2',
                            title: 'React Context Deep Dive',
                            duration: '18:30',
                            youtubeId: 'dQw4w9WgXcQ',
                            completed: true,
                        },
                        {
                            id: '3',
                            title: 'Performance Optimization',
                            duration: '22:15',
                            youtubeId: 'dQw4w9WgXcQ',
                            completed: false,
                        },
                        {
                            id: '4',
                            title: 'Advanced State Management',
                            duration: '25:40',
                            youtubeId: 'dQw4w9WgXcQ',
                            completed: false,
                        }
                    ]
                };

                setCourse(mockCourse);
                setCurrentVideo(mockCourse.videos[0]);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching course:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [courseId]);

    const handleVideoSelect = (video) => {
        if (!video.locked) {
            setCurrentVideo(video);
        }
    };

    if (loading) return <div className="text-center py-8">Loading...</div>;
    if (!course) return <div className="text-center py-8">Course not found</div>;

    return (
        <div className="w-full mx-auto px-4 py-6 max-lg:p-0">
            <div className="flex flex-col lg:flex-row gap-6 mb-8">
                <div className="lg:w-2/3 max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:right-0 max-lg:z-50 max-lg:bg-black">
                    <div className="bg-black rounded-lg max-lg:rounded-none overflow-hidden aspect-video">
                        <iframe
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/${currentVideo?.youtubeId}?autoplay=1`}
                            title={currentVideo?.title || "Course Video"}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>


                {/* Course Info */}
                <div className="lg:w-1/3 bg-white p-6 rounded-lg shadow-sm max-lg:mt-[220px]">
                    <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
                    <p className="text-gray-600 mb-4">By {course.instructor}</p>

                    <div className="space-y-3">
                        <div className="flex items-center text-gray-600">
                            <FiBarChart2 className="mr-2" />
                            <span>{course.videos.length} video lessons</span>
                        </div>
                    </div>

                    <p className="mt-4 text-gray-700">{course.description}</p>
                </div>
            </div>

            {/* Bottom Section - Video List */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 border-b">
                    <h2 className="text-xl font-semibold">Course Content</h2>
                </div>

                <div className="divide-y divide-gray-200 max-h-[500px] overflow-y-auto">
                    {course.videos.map((video) => (
                        <div
                            key={video.id}
                            onClick={() => handleVideoSelect(video)}
                            className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors flex items-center ${currentVideo?.id === video.id ? 'bg-blue-50' : ''
                                } ${video.locked ? 'opacity-70' : ''}`}
                        >
                            <div className="mr-4">
                                {video.locked ? (
                                    <FiLock className="text-gray-400" />
                                ) : video.completed ? (
                                    <FiCheckCircle className="text-green-500" />
                                ) : (
                                    <FiPlay className="text-blue-500" />
                                )}
                            </div>
                            <div className="flex-1">
                                <h3 className="font-medium">{video.title}</h3>
                                <p className="text-sm text-gray-500">{video.duration}</p>
                            </div>
                            {currentVideo?.id === video.id && (
                                <span className="text-blue-500 text-sm">Now Playing</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyCoursesDetails;