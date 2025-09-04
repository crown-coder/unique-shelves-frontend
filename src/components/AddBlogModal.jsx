import { useState } from 'react';
import { FiLoader, FiImage, FiX } from 'react-icons/fi';

const AddBlogModal = ({ isOpen, onClose, onSave, isSubmitting }) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        setPreview(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ title, body, image });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/20 bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    disabled={isSubmitting}
                >
                    <FiX className="h-6 w-6" />
                </button>

                <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Blog</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                Title *
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-1">
                                Content *
                            </label>
                            <textarea
                                id="body"
                                rows={6}
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                                Featured Image (Optional)
                            </label>
                            <div className="mt-1 flex items-center">
                                <label
                                    htmlFor="image-upload"
                                    className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center gap-2"
                                >
                                    <FiImage className="h-4 w-4" />
                                    {image ? 'Change Image' : 'Upload Image'}
                                </label>
                                <input
                                    id="image-upload"
                                    name="image-upload"
                                    type="file"
                                    className="sr-only"
                                    onChange={handleImageChange}
                                    accept="image/*"
                                />
                                {image && (
                                    <button
                                        type="button"
                                        onClick={handleRemoveImage}
                                        className="ml-2 text-sm text-red-600 hover:text-red-500"
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                            {preview && (
                                <div className="mt-2">
                                    <img src={preview} alt="Preview" className="h-32 object-contain" />
                                </div>
                            )}
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                disabled={isSubmitting}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center gap-2"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <FiLoader className="animate-spin h-4 w-4" />
                                        Saving...
                                    </>
                                ) : (
                                    'Save Blog'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddBlogModal;