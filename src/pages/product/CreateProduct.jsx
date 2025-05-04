import React, { useCallback, useEffect, useReducer, useState } from "react";
import { VscClose } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { prepareProductFormData } from "../../../utils/prepareProductFormData";
import { validateProductForm } from "../../../utils/validateProductForm";
import Loading from "../../components/Loading";
import Editor from "../../components/Product/Editor";
import Highlights from "../../components/Product/Highlights";
import ProductImageUploader from "../../components/Product/ProductImageUploader";
import ProductInput from "../../components/Product/ProductInput";
import { listBrand } from "../../features/Brand/brandslice";
import { listCategory } from "../../features/category/categorySlice";
import { createProduct } from "../../features/product/productSlice";

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
  const { successMessage, errorMessage, isLoading } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  useEffect(() => {
    dispatch(listCategory());
    dispatch(listBrand());
  }, [dispatch]);

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

    setErrors({});
    const formDataToSend = prepareProductFormData(
      formData,
      description,
      shortDescription,
      images
    );

    try {
      await dispatch(createProduct(formDataToSend)).unwrap();
    } catch (error) {
      console.log(error);
    }
  };
  /*  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]); */
  return (
    <div className="w-full lg:w-3/4 mx-auto p-6 bg-white rounded-lg">
      <h2 className="text-[24px] font-semibold text-[#111]">Add Product</h2>
      <form className="pt-1">
        <ProductInput
          placeholder="Product Title"
          title="Product Name"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title}</p>
        )}

        {/* Category and Brand */}
        <div className="flex gap-4 mt-4">
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
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category}</p>
            )}
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
            {errors.brand && (
              <p className="text-red-500 text-sm mt-1">{errors.brand}</p>
            )}
          </div>
        </div>

        {/* Image Uploader */}
        <div className="mb-4">
          <ProductImageUploader images={images} setImages={setImages} />
          {errors.images && (
            <p className="text-red-500 text-sm mt-1">{errors.images}</p>
          )}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="title">
            Description <span className="text-red-500">*</span>
          </label>
          <Editor description={description} setDescription={setDescription} />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="title">
            Short Description <span className="text-red-500">*</span>
          </label>
          <Highlights
            shortDescription={shortDescription}
            setShortDescription={setShortDescription}
          />
          {errors.shortDescription && (
            <p className="text-red-500 text-sm mt-1">
              {errors.shortDescription}
            </p>
          )}
        </div>

        {/* Pricing */}
        <div className="mb-4">
          <h2 className="title text-lg text-black">Pricing</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
            <div className="">
              <ProductInput
                title="Regular Price"
                placeholder="Regular Price"
                name="regularPrice"
                value={formData.regularPrice}
                onChange={handleInputChange}
              />
              {errors.regularPrice && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.regularPrice}
                </p>
              )}
            </div>
            <ProductInput
              title="Discount Price"
              placeholder="Discount Price"
              name="discountPrice"
              value={formData.discountPrice}
              onChange={handleInputChange}
            />
            <div className="">
              <ProductInput
                title="Stock"
                placeholder="Stock"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
              />
              {errors.stock && (
                <p className="text-red-500 text-sm mt-1">{errors.stock}</p>
              )}
            </div>
          </div>
        </div>

        {/* Shipping & Warranty */}
        <div className="mb-4">
          <h2 className="title text-lg text-black">Shipping & Warranty</h2>
          <div>
            <div className="w-1/2">
              <label className="title">
                Package Weight {"(kg)"} <span className="text-red-500">*</span>
              </label>
              <ProductInput
                placeholder="0.001 ~ 300"
                name="packageWeight"
                value={formData.packageWeight}
                onChange={handleInputChange}
              />
              {errors.packageWeight && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.packageWeight}
                </p>
              )}
            </div>

            <div className="mt-4">
              <label className="title">
                Package Dimensions {"(inch)"} (L × W × H){" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                <div>
                  <ProductInput
                    className="bg-red-500"
                    placeholder="Length"
                    name="packageLength"
                    value={formData.packageLength}
                    onChange={handleInputChange}
                  />
                  {errors.packageLength && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.packageLength}
                    </p>
                  )}
                </div>
                <VscClose />
                <div>
                  <ProductInput
                    placeholder="Width"
                    name="packageWidth"
                    value={formData.packageWidth}
                    onChange={handleInputChange}
                  />
                  {errors.packageWidth && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.packageWidth}
                    </p>
                  )}
                </div>
                <VscClose />
                <div>
                  <ProductInput
                    placeholder="Height"
                    name="packageHeight"
                    value={formData.packageHeight}
                    onChange={handleInputChange}
                  />
                  {errors.packageHeight && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.packageHeight}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Warranty Section */}
            <div className="w-1/2">
              <div className="mt-4">
                <label className="title">
                  Warranty Type <span className="text-red-500">*</span>
                </label>
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
                {errors.warrantyType && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.warrantyType}
                  </p>
                )}
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
            <label className="title">
              Meta Description <span className="text-red-500">*</span>
            </label>
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
            disabled={isLoading}
            onClick={handleSubmit}
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
          >
            {isLoading ? <Loading text={"Submitting"} /> : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
