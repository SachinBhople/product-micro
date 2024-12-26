

import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import './App.css';
import { useAddProductMutation, useDeleteProductMutation, useGetAllProductsQuery, useUpdateProductMutation } from './redux/productsApi';
import { Product } from './types/productTypes';
import { Link } from 'react-router-dom';

interface ProductFormData {
    name: string;
    desc: string;
    price: number;
    stock: number;
    mrp: number;
    hero: FileList | string;

}

const productSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    desc: z.string().min(1, 'Description is required'),
    price: z.number().min(0, 'Price is required'),
    stock: z.number().min(0, 'Stock is required number'),
    mrp: z.number().min(0, 'MRP is required number'),

    hero: z.custom<FileList>((value) => {
        if (value instanceof FileList) {
            return value.length > 0 && ["image/jpeg", "image/png"].includes(value[0].type);
        }
        return false;
    }, {
        message: "Please upload a valid image (JPEG or PNG)",
    }),
});

const ProductForm: React.FC = () => {
    const [addProduct] = useAddProductMutation();
    const [deleteProduct] = useDeleteProductMutation();
    const [updateProduct] = useUpdateProductMutation();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [inputValue, setInputValue] = useState<string>('');
    const { data: products, } = useGetAllProductsQuery(inputValue);

    const { register, handleSubmit, formState: { errors }, reset, } = useForm<Product>({
        resolver: zodResolver(productSchema),
        defaultValues: selectedProduct || {}
    });

    useEffect(() => {
        if (selectedProduct) {
            reset(selectedProduct);
        }
    }, [selectedProduct, reset]);



    const onSubmit: SubmitHandler<ProductFormData> = async (data) => {
        console.log(data);
        console.log("Form Data (JSON):", JSON.stringify(errors as string));
        const formData = new FormData();

        formData.append('name', data.name);
        formData.append('desc', data.desc);
        formData.append('price', data.price.toString());
        formData.append('stock', data.stock.toString());
        formData.append('mrp', data.mrp.toString());

        if (data.hero instanceof FileList && data.hero.length > 0) {
            formData.append('hero', data.hero[0]);
        } else if (typeof data.hero === 'string') {
            formData.append('hero', data.hero);
        } else {
            console.error('Invalid image type');
            return;
        }

        if (selectedProduct && selectedProduct._id) {
            await updateProduct({ updateId: selectedProduct._id, updatedProduct: formData });

        } else {
            await addProduct(formData);
        }
    };

    const handleDelete = (productId: string) => {
        deleteProduct(productId);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };
    return (
        <div>
            <pre>{JSON.stringify(errors as string)}</pre>
            <form onSubmit={handleSubmit(onSubmit)} className="p-3 border rounded-lg w-90 h-auto mt-5 ">
                <div>
                    <label>Name:</label>
                    <input type="text" {...register('name')} className="border p-2 w-full" />
                    {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                </div>
                <div>
                    <label>Description:</label>
                    <input type="text" {...register('desc')} className="border p-2 w-full" />
                    {errors.desc && <span className="text-red-500">{errors.desc.message}</span>}
                </div>
                <div>
                    <label>Price:</label>
                    <input type="number" {...register('price', { valueAsNumber: true })} className="border p-2 w-full" />
                    {errors.price && <span className="text-red-500">{errors.price.message}</span>}
                </div>
                <div>
                    <label>Stock:</label>
                    <input type="number" {...register('stock', { valueAsNumber: true })} className="border p-2 w-full" />
                    {errors.stock && <span className="text-red-500">{errors.stock.message}</span>}
                </div>
                <div>
                    <label>MRP:</label>
                    <input type="text" {...register('mrp', { valueAsNumber: true })} className="border p-2 w-full" />
                    {errors.mrp && <span className="text-red-500">{errors.mrp.message}</span>}
                </div>
                <div>
                    <label>Image:</label>
                    <input
                        type="file" id="image" accept="image/*"
                        {...register('hero')} className="border p-2 w-full" />
                    {errors.hero && <span className="text-red-500">{errors.hero.message}</span>}
                </div>

                <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded-lg">Submit</button>
            </form>


            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                id="inputField"
                name="inputField" placeholder='search' style={{
                    height: '20px',
                    width: '100px',
                }} />



            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>MRP</th>
                        <th>Image</th>
                        <th>View</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>

                    {products?.map((product: Product) => (
                        <tr key={product._id}>
                            <td>{product.name}</td>
                            <td>{product.desc}</td>
                            <td>{product.price}</td>
                            <td>{product.stock}</td>
                            <td>{product.mrp}</td>
                            {/* <td>{product.hero as string}</td> */}
                            <td>
                                <img src={product.hero as string} alt="" style={{ height: "50px" }} />
                            </td>
                            <td> <Link to={`/product/product-details/${product._id}`}>View</Link> </td>
                            <td>
                                <button
                                    onClick={() => handleDelete(product._id || "")}
                                    type="button"
                                    className="btn btn-outline-danger">Delete</button>
                                <button
                                    onClick={() => setSelectedProduct(product)}
                                    className="btn btn-warning"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal">Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>



        </div>
    );
};

export default ProductForm;










