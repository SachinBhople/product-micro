import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductDetailsQuery } from './redux/productsApi';
import { useAddtoCartMutation } from 'order/cartApi';

type Params = {
    productDetailId: string;
};

const ProductDetails: React.FC = () => {
    const { productDetailId } = useParams<Params>();
    const id = productDetailId || '';
    const { data: product, isLoading, error } = useGetProductDetailsQuery(id);
    const [addtocart] = useAddtoCartMutation();

    if (isLoading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-10 text-red-600">Error loading product details!</div>;
    }

    if (!id) {
        return <div className="text-center mt-10 text-red-600">Product not found.</div>;
    }
    return (
        <div className="bg-gray-100 py-10 px-5">
            {/* Product Details Section */}
            <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 grid gap-8 md:grid-cols-2 items-center">
                {/* Product Image */}
                <div className="w-full">
                    <img
                        src={product?.hero && typeof product.hero === "string" ? product.hero : "/default-image.jpg"}
                        alt={product?.name || "Product image"}
                        className="rounded-lg shadow-md object-cover w-full h-64 md:h-96 lg:h-[500px]"
                    />
                </div>

                {/* Product Details */}
                <div className="space-y-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{product?.name}</h1>
                    <p className="text-lg text-gray-600">{product?.desc}</p>

                    <div className="grid gap-2">
                        <div className="flex items-center space-x-2">
                            <span className="text-lg font-semibold text-gray-800">Price:</span>
                            <span className="text-2xl text-blue-600">${product?.price}</span>
                        </div>

                        <div className="flex items-center space-x-2">
                            <span className="text-lg font-semibold text-gray-800">MRP:</span>
                            <span className="text-lg text-gray-500 line-through">${product?.mrp}</span>
                        </div>

                        <div className="flex items-center space-x-2">
                            <span className="text-lg font-semibold text-gray-800">Stock:</span>
                            <span className="text-lg text-green-600">{product?.stock} available</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid gap-4 sm:grid-cols-2">
                        <button
                            className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-600 transition duration-200 w-full"
                            onClick={() => addtocart({ productId: product?._id })}
                        >
                            Add to Cart
                        </button>
                        <button
                            className="bg-yellow-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-yellow-600 transition duration-200 w-full"
                            onClick={() => alert("Proceeding to Checkout")}
                        >
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default ProductDetails;
