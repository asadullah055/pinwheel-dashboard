import React, { useState } from "react";
import Editor from "../../components/Product/Editor";
import Highlights from "../../components/Product/Highlights";
import ProductImageUploader from "../../components/Product/ProductImageUploader";

const CreateProduct = () => {
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");

  return (
    <div className="w-full lg:w-3/4  mx-auto p-6 bg-white rounded-lg">
      <h2 className="text-[24px] font-semibold text-[#111]">Add Product</h2>
      <form className="pt-1">
        <div className="mb-4">
          <label className="title">
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter product name"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-hidden focus:border-blue-500"
          />
        </div>
        <div className="flex gap-4">
          <div className="mb-4 w-full">
            <label className="title">
              Category <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter product name"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-hidden focus:border-blue-500"
            />
          </div>
          <div className="mb-4 w-full">
            <label className="title">
              Brand <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter product name"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-hidden focus:border-blue-500"
            />
          </div>
        </div>
        <div className="mb-4">
          <ProductImageUploader images={images} setImages={setImages} />
        </div>
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
        <div className="mb-4 mt-4">
          <label className="title">Product Price</label>
          <input
            type="number"
            placeholder="Enter product price"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        {/* Add more fields as needed */}

        <div className="">
          <h2 className="title">Pricing & others</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
            <div className="mb-4 w-full">
              <label className="title">
                Regular Price <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter product name"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-hidden focus:border-blue-500"
              />
            </div>
            <div className="mb-4 w-full">
              <label className="title">
                Discount Price <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter product name"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-hidden focus:border-blue-500"
              />
            </div>
            <div className="mb-4 w-full">
              <label className="title">
                Discount Type <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                name=""
                id=""
              >
                <option value="">Select discount type</option>
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed Amount</option>
              </select>
            </div>
            <div className="mb-4 w-full">
              <label className="title">
                Stock <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter product name"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-hidden focus:border-blue-500"
              />
            </div>
            <div className="mb-4 w-full">
              <label className="title">
                Shipping cost <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter product name"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-hidden focus:border-blue-500"
              />
            </div>
            <div className="mb-4 w-full">
              <label className="title">
                Adjust Shipping Cost <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter product name"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-hidden focus:border-blue-500"
              />
            </div>
            <div className="mb-4 w-full">
              <label className="title">
                Warranty <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter product name"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-hidden focus:border-blue-500"
              />
            </div>
            <div className="mb-4 w-full">
              <label className="title">
                Warranty Type <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter product name"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-hidden focus:border-blue-500"
              />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-[17px] font-semibold text-[#111] mb-1">
            Product Tags
          </label>
          <input
            type="text"
            placeholder="Enter product stock"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-[17px] font-semibold text-[#111] mb-1">
            Status
          </label>
          <select
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
            name=""
            id=""
          >
            <option value="">Select status</option>
            <option value="publish">Publish</option>
            <option value="unpublish">Unpublish</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-[17px] font-semibold text-[#111] mb-1">
            Meta Title
          </label>
          <input
            type="text"
            placeholder="Enter product stock"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="title">Meta Description</label>
          <textarea
            placeholder="Enter Meta Description"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
          ></textarea>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
