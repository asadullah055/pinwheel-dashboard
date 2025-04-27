import React, { useCallback, useEffect, useReducer, useState } from "react";
import { VscClose } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import Editor from "../../components/Product/Editor";
import Highlights from "../../components/Product/Highlights";
import ProductImageUploader from "../../components/Product/ProductImageUploader";
import ProductInput from "../../components/Product/ProductInput";
import { listBrand } from "../../features/Brand/brandslice";
import { listCategory } from "../../features/category/categorySlice";

// Reducer function
const formReducer = (state, action) => {
  const { name, value } = action;

  if (name === "metaTitle" || name === "metaDescription") {
    return {
      ...state,
      metaData: {
        ...state.metaData,
        [name]: value,
      },
    };
  }

  return {
    ...state,
    [name]: value,
  };
};

const initialFormData = {
  title: "",
  category: "",
  brand: "",
  regularPrice: "",
  discountPrice: "",
  stock: "",
  packageWeight: "",
  packageLength: "",
  packageWidth: "",
  packageHeight: "",
  warrantyType: "",
  warrantyTime: "",
  warrantyPolicy: "",
  status: "",
  metaData: {
    metaTitle: "",
    metaDescription: "",
  },
};

const CreateProduct = () => {
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");

  const [formData, dispatchFormData] = useReducer(formReducer, initialFormData);

  const { listCategories } = useSelector((state) => state.category);
  const { listAllBrands } = useSelector((state) => state.brand);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listCategory());
    dispatch(listBrand());
  }, [dispatch]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatchFormData({ name, value });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      ...formData,
      description,
      shortDescription,
      images,
    };
    console.log("Product Data:", productData);
    // Dispatch createProduct action here
  };

  return (
    <div className="w-full lg:w-3/4 mx-auto p-6 bg-white rounded-lg">
      <h2 className="text-[24px] font-semibold text-[#111]">Add Product</h2>
      <form className="pt-1" onSubmit={handleSubmit}>
        <ProductInput
          placeholder="Product Title"
          title="Product Name"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />

        {/* Category and Brand */}
        <div className="flex gap-4">
          <div className="mb-4 w-full">
            <label className="title">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            >
              <option value="">Select category</option>
              {listCategories?.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4 w-full">
            <label className="title">
              Brand <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
              name="brand"
              value={formData.brand}
              onChange={handleInputChange}
            >
              <option value="">Select brand</option>
              {listAllBrands?.map((brand) => (
                <option key={brand._id} value={brand._id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Image Uploader */}
        <div className="mb-4">
          <ProductImageUploader images={images} setImages={setImages} />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="title">Description</label>
          <Editor description={description} setDescription={setDescription} />
        </div>

        <div className="mb-4">
          <label className="title">Short Description</label>
          <Highlights
            shortDescription={shortDescription}
            setShortDescription={setShortDescription}
          />
        </div>

        {/* Pricing */}
        <div className="mb-4">
          <h2 className="title text-lg text-black">Pricing</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
            <ProductInput
              title="Regular Price"
              placeholder="Regular Price"
              name="regularPrice"
              value={formData.regularPrice}
              onChange={handleInputChange}
            />
            <ProductInput
              title="Discount Price"
              placeholder="Discount Price"
              name="discountPrice"
              value={formData.discountPrice}
              onChange={handleInputChange}
            />
            <ProductInput
              title="Stock"
              placeholder="Stock"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Shipping & Warranty */}
        <div className="mb-4">
          <h2 className="title text-lg text-black">Shipping & Warranty</h2>
          <div>
            <div className="w-1/2">
              <label className="title">Package Weight {"(kg)"}</label>
              <ProductInput
                placeholder="0.001 ~ 300"
                name="packageWeight"
                value={formData.packageWeight}
                onChange={handleInputChange}
              />
            </div>

            <div className="mt-4">
              <label className="title">
                Package Dimensions {"(inch)"} (L × W × H)
              </label>
              <div className="flex items-center gap-2">
                <ProductInput
                  placeholder="Length"
                  name="packageLength"
                  value={formData.packageLength}
                  onChange={handleInputChange}
                />
                <VscClose />
                <ProductInput
                  placeholder="Width"
                  name="packageWidth"
                  value={formData.packageWidth}
                  onChange={handleInputChange}
                />
                <VscClose />
                <ProductInput
                  placeholder="Height"
                  name="packageHeight"
                  value={formData.packageHeight}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Warranty Section */}
            <div className="w-1/2">
              <div className="mt-4">
                <label className="title">Warranty Type</label>
                <select
                  name="warrantyType"
                  value={formData.warrantyType}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                >
                  <option value="">Select Type</option>
                  <option value="no warranty">No Warranty</option>
                  <option value="brand warranty">Brand Warranty</option>
                  <option value="seller warranty">Seller Warranty</option>
                </select>
              </div>

              <div className="mt-4">
                <ProductInput
                  title="Warranty Time"
                  placeholder="Warranty Time"
                  name="warrantyTime"
                  value={formData.warrantyTime}
                  onChange={handleInputChange}
                />

                <div className="mt-4">
                  <ProductInput
                    title="Warranty Policy"
                    placeholder="Warranty Policy"
                    name="warrantyPolicy"
                    value={formData.warrantyPolicy}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="mb-4 w-1/2">
          <label className="title">Status</label>
          <select
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
          >
            <option value="">Select status</option>
            <option value="published">Published</option>
            <option value="unpublished">Unpublished</option>
          </select>
        </div>

        {/* SEO Section */}
        <div className="mb-4">
          <h2 className="title text-lg text-black">SEO Section</h2>
          <ProductInput
            title="Meta Title"
            placeholder="Meta Title"
            name="metaTitle"
            value={formData.metaData.metaTitle}
            onChange={handleInputChange}
          />

          <div className="mt-4">
            <label className="title">Meta Description</label>
            <textarea
              name="metaDescription"
              value={formData.metaData.metaDescription}
              onChange={handleInputChange}
              placeholder="Enter Meta Description"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
