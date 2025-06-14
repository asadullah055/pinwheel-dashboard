import { useState } from "react";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { useUpdatePriceAndStockMutation } from "../../features/product/productApi";

const StockModal = ({ product, closeStockModal }) => {
  const [stock, setStock] = useState(product.stock);

  const [updatePriceAndStock, { isLoading }] = useUpdatePriceAndStockMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (stock === "") {
      toast.error("Please enter a stock value");
      return;
    }
    if (Number(stock) < 0) {
      toast.error("Stock cannot be negative");
      return;
    }

    try {
      const res = await updatePriceAndStock({
        id: product._id,
        stock: Number(stock),
      }).unwrap();
      toast.success(res?.message || "Stock updated successfully");
      closeStockModal();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update stock");
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
          <h2 className="text-xl font-semibold">Edit Stock</h2>
          <button className="cursor-pointer" onClick={closeStockModal}>
            <IoClose size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="bg-gray-100 rounded-md p-4">
          <div className="grid grid-cols-2 gap-4 items-center">
            {/* Product Info */}
            <div className="flex items-center gap-3">
              <img
                src={product?.images[0]}
                alt={product?.title}
                className="w-10 h-10 rounded-md"
              />
              <p className="text-sm font-semibold text-gray-700 line-clamp-3">
                {product.title}
              </p>
            </div>

            {/* Stock Input */}
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Stock</label>
              <div className="flex items-center border rounded-md bg-white">
                <input
                  type="number"
                  min="0"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="p-2 w-full outline-none rounded-md"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end mt-6 gap-4">
          <button
            onClick={closeStockModal}
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

export default StockModal;
