
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product, } from '../types/productTypes';

export const productsApi = createApi({
    reducerPath: 'productsApi',
    // baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5500/api/products' }),
    baseQuery: fetchBaseQuery({ baseUrl: 'https://product-new-server.vercel.app/api/products', credentials: "include" }),
    tagTypes: ['Product'],
    endpoints: (builder) => ({


        getAllProducts: builder.query<Product[], string | void>({
            query: (search) => {
                console.log(search);

                return {
                    url: '/products',
                    method: 'GET',
                    params: { search },
                }
            },
            transformResponse: (response: { products: Product[] }) => {
                return response.products;
            },
            providesTags: ['Product'],
        }),


        addProduct: builder.mutation<void, FormData>({
            query: (newProduct) => ({
                url: '/add-product',
                method: 'POST',
                body: newProduct,
            }),
            invalidatesTags: ['Product'],
        }),


        updateProduct: builder.mutation<void, { updatedProduct: FormData, updateId: string }>({
            query: ({ updateId, updatedProduct }) => ({
                url: `/update-product/${updateId}`,
                method: 'PUT',
                body: updatedProduct,
            }),
            invalidatesTags: ['Product'],
        }),

        // Delete a product
        deleteProduct: builder.mutation<void, string>({
            query: (deleteId) => ({
                url: `/delete-product/${deleteId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Product'],
        }),

        // Deactivate a product
        deactivateProduct: builder.mutation<void, string>({
            query: (deactiveId) => ({
                url: `/deactivate-product/${deactiveId}`,
                method: 'PUT',
            }),
            invalidatesTags: ['Product'],
        }),

        // Activate a product
        activateProduct: builder.mutation<void, string>({
            query: (activeId) => ({
                url: `/activate-product/${activeId}`,
                method: 'PUT',
            }),
            invalidatesTags: ['Product'],
        }),

        // Get product details
        getProductDetails: builder.query<Product, string>({
            query: (productDetailId) => `/product-details/${productDetailId}`,
            transformResponse: (data: { result: Product }) => {
                return data.result;
            },

        }),
    }),
});

export const {
    useGetAllProductsQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useDeactivateProductMutation,
    useActivateProductMutation,
    useGetProductDetailsQuery,
} = productsApi;
