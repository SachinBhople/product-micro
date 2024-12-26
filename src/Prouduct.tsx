import React from 'react';
import { useGetAllProductsQuery } from './redux/productsApi';
import { Link } from 'react-router-dom';

const Product: React.FC = () => {
    const { data: products } = useGetAllProductsQuery('');

    return (
        <div className="max-w-7xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6 text-center text-red-500">Our Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products?.map((product) => (
                    <div 
                        key={product._id} 
                        className="border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-xl hover:scale-105 transition-transform duration-300"
                    >
                        <img
                            src={product.hero as string}
                            alt={product.name}
                            className="w-full h-64 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-lg font-semibold mb-2 text-gray-800">{product.name}</h2>
                            <p className="text-sm text-gray-600 mb-2">{product.desc}</p>
                            <p className="text-sm text-gray-800 mb-1 font-medium">Price: <span className="text-green-600">₹{product.price}</span></p>
                            <p className="text-sm text-gray-800 mb-1 font-medium">Stock: <span className={product.stock > 0 ? "text-green-600" : "text-red-600"}>{product.stock}</span></p>
                            <p className="text-sm text-gray-800 mb-1 font-medium">MRP: ₹{product.mrp}</p>
                            <Link
                                to={`/product/product-details/${product._id}`}
                                className="block mt-3 bg-blue-500 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200"
                            >
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Product;
