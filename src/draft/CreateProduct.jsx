
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FiPlus } from "react-icons/fi";
import FieldSet from "../../components/Form/FieldSet";
import Input from "../../components/Form/Input";
import Select from "../../components/Form/Select";
import ProductImageUploader from "../../components/Product/ProductImageUploader";
import { useGetAllBrandsQuery } from "../../features/Brand/brandApi";
import { useGetDropdownCategoriesQuery } from "../../features/category/categoryApi";
import { useCreateProductMutation } from "../../features/product/productApi";
import Variant from './../../components/Product/Variant';

const CreateProduct = () => {
    const { data: brandData } = useGetAllBrandsQuery();
    const { data: categoryData } = useGetDropdownCategoriesQuery();
    const [createProduct, { isLoading }] = useCreateProductMutation();
    const [availability, setAvailability] = useState(false);
    const listCategories = categoryData?.categories || [];
    const listAllBrands = brandData?.brands || [];

    const [description, setDescription] = useState("");
    const [shortDescription, setShortDescription] = useState("");

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({

    });

    const onSubmit = async (data) => {
        const payload = {
            ...data,
            description,
            shortDescription,
        };
        console.log("Final Payload:", payload);
        // await createProduct(payload);
    };

    return (
        <div className="w-full lg:w-3/4 ms-4 p-6 rounded-lg">
            <h2 className="text-xl lg:text-4xl font-semibold mb-4">Add Product</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Basic Information */}
                <div className="border border-gray-300 rounded bg-white">
                    <p className="p-4 font-semibold text-gray-800 bg-gray-200">
                        Basic Information
                    </p>
                    <div className="p-4">
                        <FieldSet>
                            {/* Product Name */}
                            <Input
                                title="Product Name"
                                name="productName"
                                star={true}
                                control={control}
                                error={errors.productName}
                                htmlFor={"productNameInput"}
                            />

                            {/* Category & Brand */}
                            <div className="flex gap-4 mt-2">
                                <Select
                                    title="Category"
                                    name="category"
                                    star={true}
                                    control={control}
                                    options={listCategories}
                                    error={errors.category}
                                    htmlFor="categorySelect"
                                />
                                <Select
                                    title="Brand"
                                    name="brand"
                                    star={true}
                                    control={control}
                                    options={listAllBrands}
                                    error={errors.brand}
                                    htmlFor="brandSelect"
                                />
                            </div>

                            {/* Product Images */}
                            <div className="mb-4 mt-4">
                                <label className="font-medium mb-2 block">
                                    Product Images <span className="text-red-500">*</span>
                                </label>
                                <Controller
                                    name="images"
                                    control={control}
                                    rules={{ required: "Product Images are required" }}
                                    render={({ field }) => (
                                        <ProductImageUploader
                                            images={field.value || []}
                                            setImages={field.onChange}
                                        />
                                    )}
                                />
                                {errors.images && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.images.message}
                                    </p>
                                )}
                            </div>
                        </FieldSet>
                    </div>
                </div>

                {/* Description */}
                <div className="border border-gray-300 rounded bg-white mt-4">
                    <p className="p-4 font-semibold text-gray-800 bg-gray-200">
                        Description
                    </p>
                    <div className="p-4">
                        <div className="mb-4">
                            <label className="font-medium mb-2 block">
                                Description <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
                                rows={5}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter product description"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="font-medium mb-2 block">
                                Short Description <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
                                rows={3}
                                value={shortDescription}
                                onChange={(e) => setShortDescription(e.target.value)}
                                placeholder="Enter short description"
                            />
                        </div>
                    </div>
                </div>
                <div className="border border-gray-300 rounded bg-white mt-4 pb-3">
                    <p className="p-4 font-semibold text-gray-800 bg-gray-200">
                        Price, Stock & Variants
                    </p>
                    <div className="px-4 py-2">
                        <p className=" text-gray-700 text-sm mb-1">You can add variants to a product that has more than one option, such as size or color.</p>
                        <button type="button" className="px-2 py-1 rounded border-blue-600 border flex gap-2 items-center"> <FiPlus size={20} /> Add Variant</button>
                    </div>
                    <div className="flex items-center gap-2 rounded-md px-4 py-2">
                        {/* Price */}
                        <div className="flex items-center border rounded px-2 py-1 bg-white">
                            <span className="text-gray-600 mr-1">৳</span>
                            <input
                                type="text"
                                placeholder="Price"
                                className="w-24 outline-none border-none focus:ring-0 text-sm"
                            />
                        </div>

                        {/* Special Price */}
                        <div className="flex items-center border rounded px-2 py-1 bg-white">
                            <span className="text-gray-600 mr-1">৳</span>
                            <input
                                type="text"
                                placeholder="Discount Price"
                                className="w-28 outline-none border-none focus:ring-0 text-sm"
                            />
                        </div>

                        {/* Stock */}
                        <div className="flex items-center border rounded px-2 py-1 bg-white">
                            <input
                                type="text"
                                placeholder="Stock"
                                className="w-20 outline-none border-none focus:ring-0 text-sm"
                            />
                        </div>

                        {/* Seller SKU */}
                        <div className="flex items-center border rounded px-2 py-1 bg-white">
                            <input
                                type="text"
                                placeholder="SellerSKU"
                                maxLength={200}
                                className="w-40 outline-none border-none focus:ring-0 text-sm"
                            />
                            <span className="ml-1 text-xs text-gray-400">0/200</span>
                        </div>

                        {/* Apply To All Button */}
                        <button
                            type="button"
                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm font-medium"
                        >
                            Apply To All
                        </button>
                    </div>

                    <div className="px-4 overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300 text-sm">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border border-gray-300 p-2 text-left">Price</th>
                                    <th className="border border-gray-300 p-2 text-left">Discount Price</th>
                                    <th className="border border-gray-300 p-2 text-left">Stock</th>
                                    <th className="border border-gray-300 p-2 text-left">Shop SKU</th>
                                    <th className="border border-gray-300 p-2 text-left">Availability</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {/* Price */}
                                    <td className="border border-gray-300 p-2">
                                        <div className="flex items-center space-x-1">
                                            <span className="text-gray-600">৳</span>
                                            <input
                                                type="text"
                                                defaultValue="2,500"
                                                className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                            />
                                        </div>
                                    </td>

                                    {/* Special Price */}
                                    <td className="border border-gray-300 p-2">
                                        <input
                                            type="text"
                                            defaultValue="2,300"
                                            className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                        />
                                    </td>

                                    {/* Stock */}
                                    <td className="border border-gray-300 p-2">
                                        <input
                                            type="text"
                                            defaultValue="0"
                                            className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                        />
                                    </td>



                                    {/* Shop SKU */}
                                    <td className="border border-gray-300 p-2">
                                        <input
                                            type="text"
                                            className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                        />
                                    </td>

                                    {/* Availability */}
                                    <td className="border border-gray-300 p-2 text-center">
                                        <button
                                            type="button"
                                            onClick={() => setAvailability(!availability)}
                                            className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${availability ? "bg-green-500" : "bg-gray-400"
                                                }`}
                                        >
                                            <span
                                                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-300 ${availability ? "translate-x-6" : "translate-x-0"
                                                    }`}
                                            />
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`mt-4 bg-blue-600 text-white px-6 py-2 rounded ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                >
                    {isLoading ? "Submitting..." : "Create Product"}
                </button>
            </form>
            <Variant />
        </div>
    );
};

export default CreateProduct;
