import { useCallback, useReducer, useState } from "react";
import toast from "react-hot-toast";

// import Editor from "./Editor";
import Highlights from "../../components/Product/Highlights";
import ProductImageUploader from "../../components/Product/ProductImageUploader";
import ProductInput from "../../components/Product/ProductInput";
import ProductSelect from "../../components/Product/ProductSelect"; // separate select input with error

import { useGetAllBrandsQuery } from "../../features/Brand/brandApi";
import { useGetDropdownCategoriesQuery } from "../../features/category/categoryApi";
import { useCreateProductMutation } from "../../features/product/productApi";

import { prepareProductFormData } from "../../../utils/prepareProductFormData";
import { validateProductForm } from "../../../utils/validateProductForm";
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

const formReducer = (state, action) => {
  if (action.type === "reset") return initialFormData;

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

const CreateProduct = () => {
  const [formData, dispatchFormData] = useReducer(formReducer, initialFormData);
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});

  const resetForm = () => {
    dispatchFormData({ type: "reset" });
    setDescription("");
    setShortDescription("");
    setImages([]);
    setErrors({});
  };

  const { data: brandData } = useGetAllBrandsQuery();
  const { data: categoryData } = useGetDropdownCategoriesQuery();
  const [createProduct, { isLoading }] = useCreateProductMutation();

  const listCategories = categoryData?.categories || [];
  const listAllBrands = brandData?.brands || [];

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;

    dispatchFormData({ name, value });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateProductForm(
      formData,
      description,
      shortDescription,
      images
    );

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formDataToSend = prepareProductFormData(
      formData,
      description,
      shortDescription,
      images
    );

    try {
      const res = await createProduct(formDataToSend).unwrap();
      toast.success(res.message || "Product created successfully!");
      resetForm();
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="w-full lg:w-3/4 mx-auto p-6 bg-white rounded-lg">
      <h2 className="text-2xl font-semibold text-[#111] mb-4">Add Product</h2>

      <form onSubmit={handleSubmit}>
        <ProductInput
          title="Product Name"
          placeholder="Product Title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          error={errors.title}
          star={true}
        />

        <div className="flex gap-4">
          <ProductSelect
            title="Category"
            name="category"
            star={true}
            value={formData.category}
            onChange={handleInputChange}
            options={listCategories}
            error={errors.category}
          />
          <ProductSelect
            title="Brand"
            name="brand"
            star={true}
            value={formData.brand}
            onChange={handleInputChange}
            options={listAllBrands}
            error={errors.brand}
          />
        </div>

        <div className="mb-4">
          <label className="font-medium mb-2 block">
            Product Images <span className="text-red-500">*</span>
          </label>
          <ProductImageUploader images={images} setImages={setImages} />
          {errors.images && (
            <p className="text-red-500 text-xs mt-1">{errors.images}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="font-medium mb-2 block">
            Description <span className="text-red-500">*</span>
          </label>
          <Editor description={description} setDescription={setDescription} />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">{errors.description}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="font-medium mb-2 block">
            Short Description <span className="text-red-500">*</span>
          </label>
          <Highlights
            shortDescription={shortDescription}
            setShortDescription={setShortDescription}
          />
          {errors.shortDescription && (
            <p className="text-red-500 text-xs mt-1">
              {errors.shortDescription}
            </p>
          )}
        </div>

        <div className="grid grid-cols-3 gap-2 mb-2">
          <ProductInput
            title="Regular Price"
            name="regularPrice"
            value={formData.regularPrice}
            onChange={handleInputChange}
            placeholder="e.g. 100"
            error={errors.regularPrice}
            star={true}
          />
          <ProductInput
            title="Discount Price"
            name="discountPrice"
            value={formData.discountPrice}
            onChange={handleInputChange}
            placeholder="e.g. 90"
          />
          <ProductInput
            title="Stock"
            name="stock"
            value={formData.stock}
            onChange={handleInputChange}
            placeholder="e.g. 50"
            error={errors.stock}
            star={true}
          />
        </div>

        <hr />
        {/* Package Info */}
        <h3 className="font-semibold mt-2 mb-2">Package Info</h3>
        <div className="grid grid-cols-2 gap-x-3 mb-2">
          <ProductInput
            name="packageWeight"
            title="Weight"
            star={true}
            value={formData.packageWeight}
            onChange={handleInputChange}
            error={errors.packageWeight}
          />
          <ProductInput
            name="packageLength"
            title="Length"
            star={true}
            value={formData.packageLength}
            onChange={handleInputChange}
            error={errors.packageLength}
          />
          <ProductInput
            name="packageWidth"
            title="Width"
            star={true}
            value={formData.packageWidth}
            onChange={handleInputChange}
            error={errors.packageWidth}
          />
          <ProductInput
            name="packageHeight"
            title="Height"
            star={true}
            value={formData.packageHeight}
            onChange={handleInputChange}
            error={errors.packageHeight}
          />
        </div>
        <hr />
        {/* Warranty */}
        <div className="w-1/2">
          <h3 className="font-semibold mt-2 mb-2">Warranty Info</h3>
          <ProductSelect
            title="Warranty Type"
            name="warrantyType"
            value={formData.warrantyType}
            options={[
              { _id: "no warranty", name: "No Warranty" },
              { _id: "brand warranty", name: "Brand Warranty" },
              { _id: "seller warranty", name: "Seller Warranty" },
            ]}
            star={true}
            onChange={handleInputChange}
            error={errors.warrantyType}
          />
          <ProductSelect
            title="Warranty Time"
            name="warrantyTime"
            value={formData.warrantyTime}
            options={warrantyData}
            onChange={handleInputChange}
            error={errors.warrantyTime}
          />
          <ProductInput
            name="warrantyPolicy"
            title="Warranty Policy"
            value={formData.warrantyPolicy}
            onChange={handleInputChange}
          />
        </div>

        {/* Status */}
        <ProductSelect
          title="Status"
          name="status"
          value={formData.status}
          options={[
            { _id: "published", name: "Published" },
            { _id: "unpublished", name: "Unpublished" },
          ]}
          star={true}
          onChange={handleInputChange}
          error={errors.status}
        />

        {/* SEO */}
        <h3 className="font-semibold mt-4">SEO Metadata</h3>
        <ProductInput
          name="metaTitle"
          title="Meta Title"
          placeholder="Meta title here..."
          star={true}
          value={formData.metaData.metaTitle}
          onChange={handleInputChange}
          error={errors["metaData.metaTitle"]}
        />
        <div className="">
          <label className="font-medium block" htmlFor="metaDescription">
            Meta Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="metaDescription"
            id="metaDescription"
            rows="4"
            value={formData.metaData.metaDescription}
            onChange={handleInputChange}
            placeholder="Meta description here..."
            className={`w-full border mt-2 p-2 focus:outline-none focus:ring focus:ring-blue-500 rounded-sm text-sm ${
              errors["metaData.metaDescription"] && "border-red-500"
            }`}
          />
          {errors["metaData.metaDescription"] && (
            <p className="text-red-500 text-xs mt-1">
              {errors["metaData.metaDescription"]}
            </p>
          )}
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
