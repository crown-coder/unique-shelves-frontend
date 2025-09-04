import { useEffect, useState } from "react";
import axios from "axios";
import { FaEye, FaEdit, FaTrash, FaPlus, FaSearch, FaFilter, FaBox, FaDollarSign, FaWarehouse, FaInfoCircle } from "react-icons/fa";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(null);
            const { data } = await axios.get("http://localhost:5000/api/products");
            setProducts(data);
        } catch (err) {
            console.error("Error fetching products:", err);
            setError("Failed to load products. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleView = (product) => {
        setSelectedProduct(product);
        setIsViewOpen(true);
    };

    const handleEdit = (product) => {
        setSelectedProduct({ ...product });
        setIsEditOpen(true);
    };

    const handleDelete = (product) => {
        setSelectedProduct(product);
        setIsDeleteOpen(true);
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/products/${selectedProduct._id}`);
            setProducts(products.filter((p) => p._id !== selectedProduct._id));
            setIsDeleteOpen(false);
            // Show success message
        } catch (err) {
            console.error("Error deleting product:", err);
            setError("Failed to delete product. Please try again.");
        }
    };

    const handleSaveEdit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                `http://localhost:5000/api/products/${selectedProduct._id}`,
                selectedProduct
            );
            fetchProducts();
            setIsEditOpen(false);
            // Show success message
        } catch (err) {
            console.error("Error updating product:", err);
            setError("Failed to update product. Please try again.");
        }
    };

    const filteredProducts = products.filter(product =>
        product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error && products.length === 0) {
        return (
            <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-500 mb-4">{error}</div>
                    <button
                        onClick={fetchProducts}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 bg-white rounded-lg my-2 min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Products Management</h2>
                    <p className="text-gray-500 mt-1">Manage your product inventory and listings</p>
                </div>
                <div className="mt-4 md:mt-0">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                        <FaPlus size={14} /> Add Product
                    </button>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaSearch className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search products by name or description..."
                            className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                        <FaFilter className="text-gray-500" />
                        Filters
                    </button>
                </div>
            </div>


            {/* Products Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                {/* <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th> */}
                                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredProducts.map((product) => (
                                <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={product.imageUrl}
                                                alt={product.name}
                                                className="w-12 h-12 object-cover rounded-lg"
                                            />
                                            <div>
                                                <div className="font-medium text-gray-900">{product.name}</div>
                                                <div className="text-sm text-gray-500 line-clamp-1">{product.description}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="font-medium text-gray-900">${product.price}</div>
                                    </td>
                                    {/* <td className="p-4">
                                        <div className={`font-medium ${product.stock < 5 ? 'text-red-600' :
                                                product.stock < 10 ? 'text-yellow-600' : 'text-green-600'
                                            }`}>
                                            {product.stock} units
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.stock > 0
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                            }`}>
                                            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                        </span>
                                    </td> */}
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <button
                                                className="text-gray-400 hover:text-blue-500 transition-colors p-1.5 rounded-lg hover:bg-blue-50"
                                                onClick={() => handleView(product)}
                                                title="View details"
                                            >
                                                <FaEye size={16} />
                                            </button>
                                            <button
                                                className="text-gray-400 hover:text-yellow-500 transition-colors p-1.5 rounded-lg hover:bg-yellow-50"
                                                onClick={() => handleEdit(product)}
                                                title="Edit product"
                                            >
                                                <FaEdit size={16} />
                                            </button>
                                            <button
                                                className="text-gray-400 hover:text-red-500 transition-colors p-1.5 rounded-lg hover:bg-red-50"
                                                onClick={() => handleDelete(product)}
                                                title="Delete product"
                                            >
                                                <FaTrash size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-12">
                        <FaBox className="text-gray-300 text-3xl mx-auto mb-3" />
                        <p className="text-gray-500">No products found</p>
                        {searchTerm && (
                            <p className="text-sm text-gray-400 mt-1">Try adjusting your search terms</p>
                        )}
                    </div>
                )}
            </div>

            {/* View Modal */}
            {isViewOpen && selectedProduct && (
                <div className="fixed inset-0 bg-black/20 bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-xl font-semibold text-gray-800">Product Details</h2>
                        </div>
                        <div className="p-6">
                            <div className="mb-4">
                                <img
                                    src={selectedProduct.imageUrl}
                                    alt={selectedProduct.name}
                                    className="w-full h-48 object-cover rounded-lg mb-4"
                                />
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Name</label>
                                        <p className="font-medium">{selectedProduct.name}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Price</label>
                                        <p className="font-medium">${selectedProduct.price}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Stock</label>
                                        <p className="font-medium">{selectedProduct.stock} units</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Description</label>
                                        <p className="text-gray-700">{selectedProduct.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 border-t border-gray-100 flex justify-end">
                            <button
                                onClick={() => setIsViewOpen(false)}
                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {isEditOpen && selectedProduct && (
                <div className="fixed inset-0 bg-black/20 bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-xl font-semibold text-gray-800">Edit Product</h2>
                        </div>
                        <form onSubmit={handleSaveEdit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                <input
                                    type="text"
                                    value={selectedProduct.name}
                                    onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                                <input
                                    type="number"
                                    value={selectedProduct.price}
                                    onChange={(e) => setSelectedProduct({ ...selectedProduct, price: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    min="0"
                                    step="0.01"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
                                <input
                                    type="number"
                                    value={selectedProduct.stock}
                                    onChange={(e) => setSelectedProduct({ ...selectedProduct, stock: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    min="0"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                <textarea
                                    value={selectedProduct.description}
                                    onChange={(e) => setSelectedProduct({ ...selectedProduct, description: e.target.value })}
                                    rows={3}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                />
                            </div>
                        </form>
                        <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
                            <button
                                onClick={() => setIsEditOpen(false)}
                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveEdit}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {isDeleteOpen && selectedProduct && (
                <div className="fixed inset-0 bg-black/20 bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-xl font-semibold text-gray-800">Confirm Deletion</h2>
                        </div>
                        <div className="p-6">
                            <p className="text-gray-600">
                                Are you sure you want to delete <span className="font-semibold">"{selectedProduct.name}"</span>? This action cannot be undone.
                            </p>
                            {selectedProduct.stock > 0 && (
                                <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-start gap-3">
                                    <FaInfoCircle className="text-yellow-600 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-yellow-800">Warning: Product has inventory</p>
                                        <p className="text-xs text-yellow-700">{selectedProduct.stock} units in stock</p>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
                            <button
                                onClick={() => setIsDeleteOpen(false)}
                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Delete Product
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Products;