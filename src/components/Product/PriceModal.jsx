import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

const PriceModal = ({ closeModal }) => {
  const [retailPrice, setRetailPrice] = useState("200");
  const [discountPrice, setDiscountPrice] = useState("160");
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div
        className="bg-white rounded-lg shadow-lg w-[700px] p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Edit Price</h2>
          <button className="cursor-pointer" onClick={closeModal}>
            <IoClose size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="bg-gray-100 rounded-md p-4">
          <div className="grid grid-cols-3 gap-4 items-center">
            {/* Product Info */}
            <div className="flex items-center gap-3">
              <img
                src="https://i.ibb.co/7g0xY2N/Rectangle-1.png"
                alt="Product"
                className="w-10 h-10 rounded-md"
              />
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-gray-700">Red</p>
              </div>
            </div>

            {/* Product Retail Price */}
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Regular Price</label>
              <div className="flex items-center border rounded-md bg-white">
                <span className="px-2 text-gray-500">৳</span>
                <input
                  type="text"
                  value={retailPrice}
                  onChange={(e) => setRetailPrice(e.target.value)}
                  className="p-2 w-full outline-none rounded-md"
                />
              </div>
            </div>

            {/* Daily Discount Price */}
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Discount Price</label>
              <div className="flex items-center border rounded-md bg-white">
                <span className="px-2 text-gray-500">৳</span>
                <input
                  type="text"
                  value={discountPrice}
                  onChange={(e) => setDiscountPrice(e.target.value)}
                  className="p-2 w-full outline-none rounded-md"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end mt-6 gap-4">
          <button
            onClick={closeModal}
            className="px-5 py-2 bg-white border rounded-md text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              closeModal();
              // Save logic can be added here
            }}
            className="px-5 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default PriceModal;
