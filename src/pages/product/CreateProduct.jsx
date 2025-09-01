import { useState } from "react";

// import Editor from "./Editor";
import Highlights from "../../components/Product/Highlights";
import ProductImageUploader from "../../components/Product/ProductImageUploader";
import ProductInput from "../../components/Product/ProductInput";
import ProductSelect from "../../components/Product/ProductSelect"; // separate select input with error

import { useGetAllBrandsQuery } from "../../features/Brand/brandApi";
import { useGetDropdownCategoriesQuery } from "../../features/category/categoryApi";
import { useCreateProductMutation } from "../../features/product/productApi";

import { warrantyData } from "../../../utils/warrantyData";
import Loading from "../../components/Loading";
import Editor from "../../components/Product/Editor";

// Reducer for managing form
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
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});

  const { data: brandData } = useGetAllBrandsQuery();
  const { data: categoryData } = useGetDropdownCategoriesQuery();
  const [createProduct, { isLoading }] = useCreateProductMutation();

  const listCategories = categoryData?.categories || [];
  const listAllBrands = brandData?.brands || [];

  const handleInputChange = () => {
    const { name, value } = e.target;
  };

  const handleSubmit = async (e) => {};

  return (
    <div className="w-full lg:w-3/4 ms-4 p-6 rounded-lg">
      <h2 className="text-xl lg:text-4xl font-semibold text-[#111] mb-4">
        Add Product
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Basic Information */}
        <div className="border border-gray-300 rounded bg-white">
          <p className="p-4 font-semibold text-gray-800 bg-gray-200 ">
            Basic Information
          </p>
          <div className="p-4">
            <ProductInput
              title="Product Name"
              placeholder="Product Title"
              name="title"
              onChange={handleInputChange}
              star={true}
            />

            <div className="flex gap-4">
              <ProductSelect
                title="Category"
                name="category"
                star={true}
                onChange={handleInputChange}
                options={listCategories}
              />
              <ProductSelect
                title="Brand"
                name="brand"
                star={true}
                onChange={handleInputChange}
                options={listAllBrands}
              />
            </div>
            {/* image upload */}
            <div className="mb-4">
              <label className="font-medium mb-2 block">
                Product Images <span className="text-red-500">*</span>
              </label>
              <ProductImageUploader images={images} setImages={setImages} />
            </div>
          </div>
        </div>
        {/*  Description Highlight*/}
        <div className="border border-gray-300 rounded bg-white mt-4">
          <p className="p-4 font-semibold text-gray-800 bg-gray-200 ">
            Description and Highlight
          </p>
          <div className="p-4">
            {/* Description */}
            <div className="mb-4">
              <label className="font-medium mb-2 block">
                Description <span className="text-red-500">*</span>
              </label>
              <Editor
                description={description}
                setDescription={setDescription}
              />
            </div>
            {/* Short Description */}
            <div className="mb-4">
              <label className="font-medium mb-2 block">
                Short Description <span className="text-red-500">*</span>
              </label>
              <Highlights
                shortDescription={shortDescription}
                setShortDescription={setShortDescription}
              />
            </div>
          </div>
        </div>
        {/* Price, Stock & Variants */}
        <div className="border border-gray-300 rounded bg-white mt-4">
          <p className="p-4 font-semibold text-gray-800 bg-gray-200 ">
            Price, Stock & Variants
          </p>
          <div className="p-4">
            <div className="grid grid-cols-3 gap-2 mb-2">
              <ProductInput
                title="Regular Price"
                name="regularPrice"
                onChange={handleInputChange}
                placeholder="e.g. 100"
                star={true}
              />
              <ProductInput
                title="Discount Price"
                name="discountPrice"
                onChange={handleInputChange}
                placeholder="e.g. 90"
              />
              <ProductInput
                title="Stock"
                name="stock"
                onChange={handleInputChange}
                placeholder="e.g. 50"
                star={true}
              />
            </div>
          </div>
        </div>

        <div className="border border-gray-300 rounded bg-white mt-4">
          <p className="p-4 font-semibold text-gray-800 bg-gray-200 ">
            Service & Warranty
          </p>
          <div className="p-4">
            <div className="w-1/2">
              <h3 className="font-semibold mt-2 mb-2">Warranty Info</h3>
              <ProductSelect
                title="Warranty Type"
                name="warrantyType"
                options={[
                  { _id: "no warranty", name: "No Warranty" },
                  { _id: "brand warranty", name: "Brand Warranty" },
                  { _id: "seller warranty", name: "Seller Warranty" },
                ]}
                star={true}
                onChange={handleInputChange}
              />
              <ProductSelect
                title="Warranty Time"
                name="warrantyTime"
                options={warrantyData}
                onChange={handleInputChange}
              />
              <ProductInput
                name="warrantyPolicy"
                title="Warranty Policy"
                onChange={handleInputChange}
              />
            </div>

            {/* Package Info */}
            <h3 className="font-semibold mt-2 mb-2">Package Info</h3>
            <div className="grid grid-cols-2 gap-x-3 mb-2">
              <ProductInput
                name="packageWeight"
                title="Weight"
                star={true}
                onChange={handleInputChange}
              />
              <ProductInput
                name="packageLength"
                title="Length"
                star={true}
                onChange={handleInputChange}
              />
              <ProductInput
                name="packageWidth"
                title="Width"
                star={true}
                onChange={handleInputChange}
              />
              <ProductInput
                name="packageHeight"
                title="Height"
                star={true}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        {/* Warranty */}

        {/* Status */}
        <ProductSelect
          title="Status"
          name="status"
          options={[
            { _id: "published", name: "Published" },
            { _id: "unpublished", name: "Unpublished" },
          ]}
          star={true}
          onChange={handleInputChange}
        />

        {/* SEO */}
        <h3 className="font-semibold mt-4">SEO Metadata</h3>
        <ProductInput
          name="metaTitle"
          title="Meta Title"
          placeholder="Meta title here..."
          star={true}
          onChange={handleInputChange}
        />
        <div className="">
          <label className="font-medium block" htmlFor="metaDescription">
            Meta Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="metaDescription"
            id="metaDescription"
            rows="4"
            onChange={handleInputChange}
            placeholder="Meta description here..."
            className={`w-full border mt-2 p-2 focus:outline-none focus:ring focus:ring-blue-500 rounded-sm text-sm ${
              errors["metaData.metaDescription"] && "border-red-500"
            }`}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className={`mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? <Loading text="Submitting..." /> : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
