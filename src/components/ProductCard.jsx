const ProductCard = ({ title, description, imageUrl, buylink }) => {
    return (
        <article className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300 p-4 flex flex-col h-full">
            <div className="relative pb-[75%] overflow-hidden rounded-xl mb-4">
                <img
                    src={imageUrl}
                    alt={title}
                    className="absolute h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                />
            </div>

            <div className="flex-grow">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                    {title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {description}
                </p>
            </div>

            <a
                href={buylink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-block w-full bg-blue-600 hover:bg-blue-700 text-white text-center font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
                Visit Product →
            </a>
        </article>
    )
}

export default ProductCard
