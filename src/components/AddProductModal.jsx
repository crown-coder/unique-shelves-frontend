import { useState } from 'react'
import { FiX, FiAlignLeft } from 'react-icons/fi';
import { CiLink } from "react-icons/ci";

const AddProductModal = ({ isOpen, onClose, onSave, isSubmitting }) => {
    const [productData, setProductData] = useState({
        title: '',
        description: '',
        image: null, // Changed to null for file object
        buylink: ''
    });

    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'image') {
            setProductData(prev => ({
                ...prev,
                [name]: files[0] // Store the file object
            }));
        } else {
            setProductData(prev => ({
                ...prev,
                [name]: value
            }));
        }

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!productData.title.trim()) newErrors.title = 'Title is required';
        if (!productData.description.trim()) newErrors.description = 'Description is required';
        if (!productData.image) newErrors.image = 'Image is required'; // Changed check for file
        if (!productData.buylink.trim()) newErrors.buylink = 'Buy link is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validateForm()) return;

        // Create FormData for file upload
        const formData = new FormData();
        formData.append('title', productData.title);
        formData.append('description', productData.description);
        formData.append('image', productData.image);
        formData.append('buylink', productData.buylink);

        const success = await onSave(formData)
        if (success) {
            // Reset form on successful submission
            setProductData({
                title: '',
                description: '',
                image: null,
                buylink: ''
            });
            onClose();
        }
    };

    const handleOverlayClick = () => {
        if (!isSubmitting) {
            onClose();
        }
    }

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/20 bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={handleOverlayClick}
        >
            <div
                className='bg-white rounded-xl w-full max-w-2xl overflow-hidden'
                onClick={(e) => e.stopPropagation()}
            >
                <div className='flex justify-between items-center p-4 border-b border-gray-200'>
                    <h3 className='text-xl font-normal text-gray-700'>Create New Product</h3>
                    <button
                        onClick={onClose}
                        className='text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors'
                    >
                        <FiX className='text-2xl' />
                    </button>
                </div>

                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="p-6 grid grid-cols-1 gap-6">
                        {/* Left Column */}
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                                    <FiAlignLeft className="mr-2" />
                                    Product Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={productData.title}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-blue-500 focus:border-blue-500`}
                                    required
                                    placeholder="e.g., Macbook Pro 16-inch"
                                    disabled={isSubmitting}
                                />
                                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                                    <FiAlignLeft className="mr-2" />
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={productData.description}
                                    onChange={handleChange}
                                    rows="4"
                                    className={`w-full px-3 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-blue-500 focus:border-blue-500`}
                                    required
                                    placeholder="Describe the product specs..."
                                    disabled={isSubmitting}
                                />
                                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                    <FiAlignLeft className="mr-2" />
                                    Product Image
                                </label>
                                <input
                                    type="file"
                                    name="image"
                                    onChange={handleChange}
                                    accept="image/*" // Accept only image files
                                    className={`w-full px-3 py-2 border ${errors.image ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-blue-500 focus:border-blue-500`}
                                    required
                                    disabled={isSubmitting}
                                />
                                {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
                                {productData.image && (
                                    <p className="mt-1 text-sm text-gray-500">Selected file: {productData.image.name}</p>
                                )}
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                                    <CiLink className="mr-2" />
                                    Product Link
                                </label>
                                <input
                                    type="text"
                                    name="buylink"
                                    value={productData.buylink}
                                    onChange={handleChange}
                                    className={`w-full pl-8 pr-3 py-2 border ${errors.buylink ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-blue-500 focus:border-blue-500`}
                                    required
                                    placeholder="https://example.com/product"
                                    disabled={isSubmitting}
                                />
                                {errors.buylink && <p className="mt-1 text-sm text-red-600">{errors.buylink}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="p-4 border-t border-gray-200 flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={`px-4 py-2 rounded-lg transition-colors flex items-center ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Uploading...
                                </>
                            ) : 'Upload Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddProductModal