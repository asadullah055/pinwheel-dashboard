import { useState } from "react";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { useUpdatePriceAndStockMutation } from "../../features/product/productApi";

const PriceModal = ({ product, closeModal }) => {
  const [retailPrice, setRetailPrice] = useState(product.regularPrice);
  const [discountPrice, setDiscountPrice] = useState(product.discountPrice);

  // RTK Query Mutation hook
  const [updatePriceAndStock, { isLoading }] = useUpdatePriceAndStockMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (retailPrice === "") {
      return toast.error("Please fill in positive regular price");
    }

    if (isNaN(retailPrice) || isNaN(discountPrice)) {
      return toast.error("Prices must be valid numbers");
    }

    if (Number(retailPrice) < 0 || Number(discountPrice) < 0) {
      return toast.error("Prices cannot be negative");
    }

    if (Number(discountPrice) > Number(retailPrice)) {
      return toast.error("Discount price cannot be greater than regular price");
    }

    try {
      const res = await updatePriceAndStock({
        id: product._id,
        regularPrice: Number(retailPrice),
        discountPrice: Number(discountPrice),
      }).unwrap();

      toast.success(res?.message || "Price updated successfully");
      closeModal();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update price");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div
        className="bg-white rounded-lg shadow-lg w-[700px] p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Edit Price</h2>
          <button onClick={closeModal}>
            <IoClose size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="bg-gray-100 rounded-md p-4">
          <div className="grid grid-cols-3 gap-4 items-center">
            {/* Product Info */}
            <div className="flex items-center gap-3">
              <img
                src={product?.images?.[0]}
                alt={product?.title}
                className="w-10 h-10 rounded-md object-cover"
              />
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-gray-700 line-clamp-3">
                  {product.title}
                </p>
              </div>
            </div>

            {/* Regular Price */}
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Regular Price</label>
              <div className="flex items-center border rounded-md bg-white">
                <span className="px-2 text-gray-500">৳</span>
                <input
                  type="number"
                  value={retailPrice}
                  onChange={(e) => setRetailPrice(e.target.value)}
                  className="p-2 w-full border-0 outline-none rounded-md"
                />
              </div>
            </div>

            {/* Discount Price */}
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Discount Price</label>
              <div className="flex items-center border rounded-md bg-white">
                <span className="px-2 text-gray-500">৳</span>
                <input
                  type="number"
                  value={discountPrice}
                  onChange={(e) => setDiscountPrice(e.target.value)}
                  className="p-2 w-full border-0 outline-none rounded-md"
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
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-5 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 disabled:opacity-50"
          >
            {isLoading ? "Updating..." : "OK"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PriceModal;
