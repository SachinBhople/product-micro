// import React from 'react';
// import { useParams } from 'react-router-dom';
// import { useGetProductDetailsQuery } from './redux/productsApi';
// import { useAddtoCartMutation } from 'order/cartApi';

// const ProductFromDetails = () => {
//     const { productDetailId } = useParams();
//     const { data: product, isLoading, error } = useGetProductDetailsQuery(productDetailId);
//     console.log(product);
//     const [addtocart] = useAddtoCartMutation()

//     if (isLoading) {
//         return <div className="text-center mt-10">Loading...</div>;
//     }

//     if (error) {
//         return <div className="text-center mt-10 text-red-600">Error loading product details!</div>;
//     }

//     return <>

//         <div className="max-w-4xl mx-auto p-5">
//             {/* Product Details Card */}
//             <div className="bg-white shadow-lg rounded-lg p-6">
//                 {/* Product Image and Details */}
//                 <div className="flex flex-col md:flex-row items-center md:space-x-6 space-y-6 md:space-y-0">
//                     <img
//                         style={{ height: "100px" }}
//                         src={product.hero}
//                         alt={product.name}
//                         className="w-full md:w-1/3 rounded-lg object-cover h-72"
//                     />
//                     <div className="flex-1">
//                         <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
//                         <p className="text-base md:text-xl text-gray-600 mb-4">{product.desc}</p>
//                         <div className="mb-4">
//                             <span className="text-lg font-semibold text-gray-800">Price:</span>
//                             <span className="text-xl md:text-2xl text-blue-600 ml-2">${product.price}</span>
//                         </div>
//                         <div className="mb-4">
//                             <span className="text-lg font-semibold text-gray-800">MRP:</span>
//                             <span className="text-lg text-gray-500 line-through ml-2">${product.mrp}</span>
//                         </div>
//                         <div className="mb-4">
//                             <span className="text-lg font-semibold text-gray-800">Stock:</span>
//                             <span className="text-lg text-green-600 ml-2">{product.stock} available</span>
//                             <span className="text-lg text-green-600 ml-2">{product.pId} dd</span>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-6 space-y-4 sm:space-y-0 sm:space-x-4">
//                     <button
//                         className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-200 w-full sm:w-auto"
//                         onClick={() => addtocart({ productId: product._id })}
//                     >
//                         Add to Cart
//                     </button>
//                     <button
//                         className="bg-yellow-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-yellow-600 transition duration-200 w-full sm:w-auto"
//                         onClick={() => alert('Proceeding to Checkout')}
//                     >
//                         Buy Now
//                     </button>
//                 </div>
//             </div>
//         </div>
//     </>
// };

// export default ProductFromDetails;



// import React from 'react';
// import { useParams } from 'react-router-dom';
// import { useGetProductDetailsQuery } from './redux/productsApi';
// import { useAddtoCartMutation } from 'order/cartApi';

// const ProductFromDetails = () => {
//     const { productDetailId } = useParams();
//     const { data: product, isLoading, error } = useGetProductDetailsQuery(productDetailId);
//     const [addtocart] = useAddtoCartMutation();

//     if (isLoading) {
//         return <div className="text-center mt-10">Loading...</div>;
//     }

//     if (error) {
//         return <div className="text-center mt-10 text-red-600">Error loading product details!</div>;
//     }

//     return (
//         <div className="max-w-6xl bg-red-300 mx-auto p-5">
//             {/* Product Details Section */}
//             <div className="bg-red-200 shadow-lg rounded-lg p-6 flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-10">
//                 {/* Product Image */}
//                 <div className="flex-shrink-0">
//                     <img
//                         src={product.hero}
//                         alt={product.name}
//                         className="rounded-lg shadow-md object-cover w-full md:w-[350px] h-[350px]"
//                     />
//                 </div>

//                 {/* Product Details */}
//                 <div className="flex-1">
//                     <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
//                     <p className="text-lg text-gray-600 mb-4">{product.desc}</p>
//                     <div className="mb-4">
//                         <span className="text-lg font-semibold text-gray-800">Price:</span>
//                         <span className="text-2xl text-blue-600 ml-2">${product.price}</span>
//                     </div>
//                     <div className="mb-4">
//                         <span className="text-lg font-semibold text-gray-800">MRP:</span>
//                         <span className="text-lg text-gray-500 line-through ml-2">${product.mrp}</span>
//                     </div>
//                     <div className="mb-4">
//                         <span className="text-lg font-semibold text-gray-800">Stock:</span>
//                         <span className="text-lg text-green-600 ml-2">{product.stock} available</span>
//                     </div>
//                     <div className="mb-4">
//                         <span className="text-lg font-semibold text-gray-800">Product ID:</span>
//                         <span className="text-lg text-gray-600 ml-2">{product.pId}</span>
//                     </div>

//                     {/* Action Buttons */}
//                     <div className="flex flex-col sm:flex-row sm:justify-start sm:items-center mt-6 space-y-4 sm:space-y-0 sm:space-x-4">
//                         <button
//                             className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-600 transition duration-200 w-full sm:w-auto"
//                             onClick={() => addtocart({ productId: product._id })}
//                         >
//                             Add to Cart
//                         </button>
//                         <button
//                             className="bg-yellow-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-yellow-600 transition duration-200 w-full sm:w-auto"
//                             onClick={() => alert('Proceeding to Checkout')}
//                         >
//                             Buy Now
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductFromDetails;



import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductDetailsQuery } from './redux/productsApi';
import { useAddtoCartMutation } from 'order/cartApi';

const ProductFromDetails = () => {
    const { productDetailId } = useParams();
    const { data: product, isLoading, error } = useGetProductDetailsQuery(productDetailId);
    const [addtocart] = useAddtoCartMutation();

    if (isLoading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-10 text-red-600">Error loading product details!</div>;
    }

    return (
        <div className="max-w-6xl bg-red-800 mx-24 p-6">
            {/* Product Details Section */}
            <div className="flex bg-red-300">
                {/* Product Image */}
                <div className="flex-shrink-0">
                    <img
                        style={{ height: "200px" }}
                        src={product.hero}
                        alt={product.name}
                        className="rounded-lg shadow-md object-cover w-full md:w-[350px] h-[350px]"
                    />
                </div>

                {/* Product Details */}
                <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">{product.name}</h1>
                    <p className="text-lg text-gray-600 mb-6">{product.desc}</p>
                    <div className="mb-6">
                        <span className="text-lg font-semibold text-gray-800">Price:</span>
                        <span className="text-2xl text-blue-600 ml-2">${product.price}</span>
                    </div>
                    <div className="mb-6">
                        <span className="text-lg font-semibold text-gray-800">MRP:</span>
                        <span className="text-lg text-gray-500 line-through ml-2">${product.mrp}</span>
                    </div>
                    <div className="mb-6">
                        <span className="text-lg font-semibold text-gray-800">Stock:</span>
                        <span className="text-lg text-green-600 ml-2">{product.stock} available</span>
                    </div>
                    <div className="mb-6">
                        <span className="text-lg font-semibold text-gray-800">Product ID:</span>
                        <span className="text-lg text-gray-600 ml-2">{product.pId}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row sm:justify-start sm:items-center mt-8 space-y-4 sm:space-y-0 sm:space-x-4">
                        <button
                            className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-600 transition duration-200 w-full sm:w-auto"
                            onClick={() => addtocart({ productId: product._id })}
                        >
                            Add to Cart
                        </button>
                        <button
                            className="bg-yellow-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-yellow-600 transition duration-200 w-full sm:w-auto"
                            onClick={() => alert('Proceeding to Checkout')}
                        >
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductFromDetails;



