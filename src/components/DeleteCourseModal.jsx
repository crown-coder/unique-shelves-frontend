const DeleteCourseModal = ({
    isOpen,
    courseId,
    courseTitle,
    onClose,
    onConfirm,
    isDeleting
}) => {
    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        // Close only if clicking on the overlay background
        if (e.target === e.currentTarget && !isDeleting) {
            onClose();
        }
    };

    const handleDelete = () => {
        if (courseId) {
            onConfirm(courseId);
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={handleOverlayClick}
        >
            <div
                className="bg-white rounded-lg p-6 w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">Confirm Deletion</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
                        disabled={isDeleting}
                        aria-label="Close modal"
                    >
                        <span className="text-2xl">&times;</span>
                    </button>
                </div>

                <div className="mb-6">
                    <p className="text-gray-700">
                        Are you sure you want to delete the course
                        {courseTitle && (
                            <span className="font-semibold"> "{courseTitle}"</span>
                        )}?
                        This action cannot be undone.
                    </p>
                </div>

                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        disabled={isDeleting}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className={`px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center justify-center min-w-[80px] ${isDeleting ? 'opacity-70 cursor-wait' : ''
                            }`}
                    >
                        {isDeleting ? (
                            <>
                                <svg
                                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Deleting...
                            </>
                        ) : (
                            'Delete'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteCourseModal;