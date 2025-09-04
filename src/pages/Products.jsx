import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { toast } from "react-toastify";
import { getAllProducts } from "../services/productsServices";
import ProductCard from "../components/ProductCard";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const productPerPage = 8;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await getAllProducts();
                setProducts(response);
                console.log("the product data is", response);
            } catch (error) {
                toast.error("An error occurred while fetching products");
                setProducts([]);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);


    // Pagination logic
    const indexOfLastProduct = currentPage * productPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(products.length / productPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) {
        return (
            <main className="w-full min-h-dvh">
                <NavBar />
                <div className="px-8 max-lg:px-2 py-8">
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                </div>
            </main>
        )
    }


    return (
        <main className="w-full min-h-dvh bg-gray-50">
            <div className="px-8 max-lg:px-2 pb-8">
                <NavBar />

                {/* Page Header */}
                <div className="my-8">
                    <h1 className="text-3xl font-bold text-gray-900">Explore Our Products Collection</h1>
                    <p className="text-gray-600 mt-2">Find the perfect perfect product for your day-to-day use</p>
                </div>

                {/* Results count */}
                <div className="mb-4 text-gray-600">
                    {products.length} {products.length === 1 ? 'product' : 'products'} found
                </div>

                {/* Product Grid */}
                {currentProducts.length > 0 ? (
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                        {currentProducts.map(product => (
                            <ProductCard
                                key={product._id}
                                imageUrl={product.imageUrl}
                                title={product.title}
                                description={product.description}
                                buylink={product.buyLink}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <h3 className="text-lg font-medium text-gray-700">No Product found</h3>
                        <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
                    </div>
                )}

            </div>
        </main>
    )
}

export default Products
