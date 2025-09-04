import { useState, useEffect } from 'react'
import Modal from "../../Model";
import AddProductModal from '../../AddProductModal';
import { getMyProducts, addProduct } from '../../../services/productsServices'
import { toast } from 'react-toastify';
import { FiLoader } from 'react-icons/fi';

const Products = () => {
    const [showAddProductModal, setShowAddProductModal] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([])
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Fetch mentor's products
    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getMyProducts();
            setProducts(data);
        } catch (err) {
            setError(err.message);
            toast.error('Failed to fetch products');
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    // create new product
    const handleSaveProduct = async (productData) => {
        setIsProcessing(true);
        try {
            const newProduct = await addProduct(productData);
            setProducts(prev => [...prev, newProduct]);
            toast.success('Product Saved Successfully!');
            setShowAddProductModal(false);
        } catch (error) {
            console.error('Failed to Save Product:', error);
            toast.error(error.message || 'Failed to save product');
        } finally {
            setIsProcessing(false);
        }
    };

    const openModal = (product) => {
        setSelectedProduct(product);
    };

    const closeModal = () => {
        setSelectedProduct(null);
    };

    // Function to truncate description
    const truncateDescription = (desc, maxLength = 50) => {
        if (!desc) return '';
        return desc.length > maxLength ? `${desc.substring(0, maxLength)}...` : desc;
    };

    return (
        <div className="min-h-screen max-w-6xl mx-auto rounded-lg my-2 bg-white">
            {/* Header and search bar - unchanged */}
            <div className="flex justify-between items-center mb-4 bg-white p-2 rounded-lg">
                <h1 className="text-2xl font-serif text-gray-800">Product Inventory</h1>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                    <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <button
                    onClick={() => setShowAddProductModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    disabled={isProcessing}
                >
                    {isProcessing ? (
                        <FiLoader className="animate-spin h-4 w-4" />
                    ) : (
                        <span>Add New Product</span>
                    )}
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <FiLoader className="animate-spin h-8 w-8 text-blue-500" />
                </div>
            ) : error ? (
                <div className="bg-white rounded-xl p-4 text-center text-red-500">
                    {error}
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Product
                                </th>
                                {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Category
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Price
                                </th> */}
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {products.map((product) => (
                                <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <img className="h-10 w-10 rounded-md object-cover" src={product.imageUrl} alt={product.title} />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{product.title}</div>
                                                <div className="text-sm text-gray-500">{truncateDescription(product.description)}</div>
                                            </div>
                                        </div>
                                    </td>
                                    {/* <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${product.category === 'Electronics' ? 'bg-blue-100 text-blue-800' :
                                                product.category === 'Audio' ? 'bg-purple-100 text-purple-800' :
                                                    product.category === 'Wearables' ? 'bg-green-100 text-green-800' :
                                                        'bg-yellow-100 text-yellow-800'}`}>
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        ${product.price?.toFixed(2) || '0.00'}
                                    </td> */}
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => openModal(product)}
                                            className="text-blue-600 hover:text-blue-900 mr-4 transition-colors"
                                        >
                                            View
                                        </button>
                                        <button className="text-gray-600 hover:text-gray-900 transition-colors">
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Product Details Modal */}
            {selectedProduct && (
                <Modal
                    isOpen={!!selectedProduct}
                    onClose={closeModal}
                    title={selectedProduct.title}
                >
                    <div className="space-y-4">
                        <div className="bg-gray-100 rounded-xl p-4 flex justify-center">
                            <img src={selectedProduct.imageUrl} className='rounded-lg h-48 object-contain' alt={selectedProduct.title} />
                        </div>
                        <div>
                            <div className="flex justify-between items-start">
                                <h3 className="text-xl font-semibold text-gray-800">{selectedProduct.title}</h3>
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                    ${selectedProduct.category === 'Electronics' ? 'bg-blue-100 text-blue-800' :
                                        selectedProduct.category === 'Audio' ? 'bg-purple-100 text-purple-800' :
                                            selectedProduct.category === 'Wearables' ? 'bg-green-100 text-green-800' :
                                                'bg-yellow-100 text-yellow-800'}`}>
                                    {selectedProduct.category}
                                </span>
                            </div>
                            <p className="text-gray-600 my-3">{selectedProduct.description}</p>
                            <div className="flex items-center justify-between mt-4">
                                <p className="font-medium text-lg">
                                    Price: <span className="text-green-600">${selectedProduct.price?.toFixed(2) || '0.00'}</span>
                                </p>
                                <button className="text-blue-500 px-4 py-2 rounded-lg transition-colors cursor-pointer">
                                    Product Link
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}

            {/* Add Product Modal */}
            <AddProductModal
                isOpen={showAddProductModal}
                onClose={() => setShowAddProductModal(false)}
                onSave={handleSaveProduct}
                isSubmitting={isProcessing}
            />
        </div>
    );
};

export default Products;