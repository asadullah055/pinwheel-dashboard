
import { Controller } from 'react-hook-form';
import FieldSet from './../Form/FieldSet';
import Input from './../Form/Input';
import Select from './../Form/Select';
import ProductImageUploader from './ProductImageUploader';

const BasicInfo = ({ control, errors, listCategories, listAllBrands }) => {
    return (
        <div className="border border-gray-300 rounded bg-white">
            <p className="p-4 font-semibold text-gray-800 bg-gray-200">Basic Information</p>
            <div className="p-4">
                <FieldSet>
                    {/* Product Name */}
                    <Input
                        title="Product Name"
                        name="productName"
                        star={true}
                        control={control}
                        error={errors.productName}
                        htmlFor="productNameInput"
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
                            <p className="text-red-500 text-xs mt-1">{errors.images.message}</p>
                        )}
                    </div>
                </FieldSet>
            </div>
        </div>
    );
};

export default BasicInfo;