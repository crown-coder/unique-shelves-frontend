import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCourseById } from "../services/courseService"; // Adjust path if needed
import { getCourseVideos } from "../services/videoService";
import { initiatePayment } from "../services/paymentService";
import { toast } from "react-toastify";

const CourseDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [course, setCourse] = useState(null);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const courseData = await getCourseById(id);
                setCourse(courseData);

                const courseVideos = await getCourseVideos(id);
                setVideos(courseVideos);
            } catch (error) {
                toast.error(error.message);
                navigate("/courses"); // Redirect if invalid
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [id, navigate]);

    const handleEnroll = async () => {
        const userData = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (!userData || !token) {
            toast.error("Please login to enroll");
            navigate('/login', { state: { from: window.location.pathname } });
            return;
        }

        try {
            const user = JSON.parse(userData);

            // Call Monnify payment service
            const paymentLink = await initiatePayment({
                email: user.email,
                courseId: course._id
            });

            // Redirect to Monnify hosted payment page
            window.location.href = paymentLink;

        } catch (error) {
            const msg = error.response?.data?.msg || "Payment failed";
            toast.error(msg);

            if (error.response?.status === 401) {
                localStorage.clear();
                navigate('/login');
            }
        }
    };


    if (loading) return <div className="p-4 text-center">Loading course...</div>;
    if (!course) return <div className="p-4 text-center">Course not found</div>;

    return (
        <div className="min-h-dvh p-2 w-full mx-auto max-w-4xl">
            <div className="h-[200px] md:h-[400px] rounded-xl overflow-hidden shadow-lg mb-2">
                <iframe
                    className="w-full h-full"
                    src={videos.length > 0 ? videos[0].url : course.previewUrl}
                    title={course.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-md mb-6">
                <div className="flex flex-col gap-3">
                    <h2 className="font-bold text-2xl text-gray-800">{course.title}</h2>
                    <p className="text-gray-600">{course.description}</p>

                    <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                            {course.category}
                        </span>
                        <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">
                            By: {course.instructor}
                        </span>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-4">
                        <div className="flex items-center gap-1">
                            <span className="text-yellow-500">★★★★☆</span>
                            <span className="text-gray-600 ml-1">({course.rating})</span>
                            <span className="text-gray-600 ml-2">{course.students} students</span>
                        </div>
                        <button
                            onClick={handleEnroll}
                            className="px-6 py-2 rounded-full bg-blue-500 text-white font-medium hover:bg-blue-600 transition duration-200 shadow-md hover:shadow-lg w-full md:w-auto"
                        >
                            Enroll Now - ₦{course.price.toLocaleString()}
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <header className="py-3 px-6 bg-gray-50 border-b">
                    <h1 className="font-bold text-xl text-gray-800">Course Content</h1>
                    <p className="text-sm text-gray-500">{videos.length} lessons • {course.duration}</p>
                </header>

                <div className="max-h-[350px] overflow-y-auto">
                    <ul className="divide-y divide-gray-100">
                        {videos.map((video, i) => (
                            <li key={video._id} className="p-4 hover:bg-gray-50 transition duration-150">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                                            {i + 1}
                                        </div>
                                        <span className="font-medium">{video.title}</span>
                                    </div>
                                    <span className="text-sm text-gray-500">~</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="mt-6">
                <Link
                    to="/courses"
                    className="px-4 py-2 text-blue-500 font-medium hover:bg-blue-50 rounded-lg transition duration-200 inline-flex items-center"
                >
                    ← Back to Courses
                </Link>
            </div>
        </div>
    );
};

export default CourseDetails;
