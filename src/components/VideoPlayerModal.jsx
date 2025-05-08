import { FiX, FiPlay } from 'react-icons/fi';

const VideoPlayerModal = ({ isOpen, onClose, video }) => {
    if (!isOpen || !video) return null;

    console.log(video.url)

    return (
        <div className="fixed inset-0 bg-black/20 bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-4xl overflow-hidden">
                <div className="flex justify-between items-center p-4">
                    <h3 className="text-xl font-semibold">{video.title}</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
                    >
                        <FiX size={24} />
                    </button>
                </div>

                <div className="aspect-w-16 aspect-h-9 bg-black">
                    {video.url ? (
                        <div className="w-full h-96 flex items-center justify-center">
                            <iframe
                                className="w-full h-full"
                                src={video.url}
                                title={video.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>

                        </div>
                    ) : (
                        <div className="w-full h-96 flex items-center justify-center text-white">
                            <div className="text-center">
                                <FiPlay className="mx-auto text-5xl mb-4" />
                                <p>No video URL provided</p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-4 border-t">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VideoPlayerModal;