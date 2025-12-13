import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { useUpdatePriceAndStockMutation } from "../../features/product/productApi";

export default function StockModal({ product, closeStockModal }) {
  const hasVariants = product?.variants?.length > 1;

  const [variantList, setVariantList] = useState(
    product?.variants?.map((v) => ({
      ...v,
      stock: Number(v.stock) || 0,
    })) || []
  );

  // GLOBAL STOCK
  const [globalStock, setGlobalStock] = useState("");

  // SEARCH
  const [search, setSearch] = useState("");

  const filteredVariants = useMemo(() => {
    return variantList.filter((item) =>
      item.sku.toLowerCase().includes(search.toLowerCase())
    );
  }, [variantList, search]);

  const [updatePriceAndStock, { isLoading }] = useUpdatePriceAndStockMutation();

  // APPLY TO ALL
  const applyToAll = () => {
    if (globalStock === "") {
      toast.error("Please enter stock first!");
      return;
    }

    if (Number(globalStock) < 0) {
      toast.error("Stock cannot be negative!");
      return;
    }

    setVariantList((prev) =>
      prev.map((v) => ({
        ...v,
        stock: Number(globalStock),
      }))
    );

    toast.success("Applied stock to all variants!");
  };

  // SUBMIT HANDLER
  const handleSubmit = async () => {
    for (let v of variantList) {
      if (v.stock < 0 || isNaN(v.stock)) {
        toast.error("Invalid stock value!");
        return;
      }
    }

    try {
      const res = await updatePriceAndStock({
        id: product._id,
        variants: variantList.map((v) => ({
          _id: v._id,
          stock: v.stock,
        })),
      }).unwrap();

      toast.success(res?.message || "Stock updated successfully");
      closeStockModal();

    } catch (error) {
      toast.error(error?.data?.message || "Failed to update stock");
    }
  };

  // SINGLE PRODUCT CASE (unchanged)
  if (!hasVariants) {
    const single = variantList[0];
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white w-[700px] rounded-lg shadow-xl p-6 relative">

          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-semibold">Edit Stock</h2>
            <button onClick={closeStockModal}><IoClose size={26} /></button>
          </div>

          <div className="grid grid-cols-2 bg-gray-100 p-3 font-semibold text-sm rounded">
            <div>Product Info</div>
            <div>Stock</div>
          </div>

          <div className="grid grid-cols-2 p-3 items-center border-b">
            <div className="flex items-center gap-3">
              <img src={product.images[0]} className="w-12 h-12 rounded" />
              <div>
                <p className="font-semibold text-sm">
                  {single.name || product.productName}
                </p>
                <p className="text-xs text-gray-500">SKU: {single.sku}</p>
              </div>
            </div>

            <input
              type="number"
              value={single.stock}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (val < 0) return toast.error("Stock cannot be negative!");
                setVariantList([{ ...single, stock: val }]);
              }}
              className="p-2 rounded bg-gray-50 border"
            />
          </div>

          <div className="flex justify-end mt-5 gap-3">
            <button onClick={closeStockModal} className="px-5 py-2 bg-gray-200 rounded">
              Cancel
            </button>
            <button onClick={handleSubmit} className="px-5 py-2 bg-orange-600 text-white rounded">
              OK
            </button>
          </div>

        </div>
      </div>
    );
  }

  // MULTI VARIANT CASE + APPLY TO ALL
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[900px] rounded-lg shadow-xl p-6 relative max-h-[90vh] flex flex-col">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Stock</h2>
          <button onClick={closeStockModal}><IoClose size={26} /></button>
        </div>

        {/* SEARCH */}
        <div className="flex gap-3 mb-4 justify-between">
          <input
            type="text"
            placeholder="Search SKU / Variant Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-2 rounded mb-4 w-1/2"
          />

          {/* GLOBAL STOCK INPUT + APPLY BUTTON */}
          <div className="">
            <input
              type="number"
              placeholder="Enter Stock"
              value={globalStock}
              onChange={(e) => {
                const val = e.target.value;
                if (val < 0) return toast.error("Stock cannot be negative!");
                setGlobalStock(val);
              }}
              className="px-4 py-2 bg-gray-100 rounded-lg border ms-2 mr-3"
            />

            <button
              onClick={applyToAll}
              disabled={globalStock === ""}
              className={`
    px-3 py-2 text-sm rounded-lg border  
    ${globalStock === ""
                  ? "text-gray-400 border-gray-300 opacity-50 cursor-not-allowed"
                  : "text-orange-500 border-orange-500 cursor-pointer hover:bg-orange-500 hover:text-white transition"}
  `}
            >
              Apply to All
            </button>

          </div>
        </div>


        <div className="overflow-y-auto border mt-2 rounded-md">
          <div className="grid grid-cols-2 bg-gray-100 p-3 font-semibold text-sm sticky top-0">
            <div>Product Info</div>
            <div>Stock</div>
          </div>

          <div style={{ maxHeight: "35vh" }}>
            {filteredVariants.map((v) => (
              <div key={v._id} className="grid grid-cols-2 p-3 border-b items-center">

                <div className="flex items-center gap-3">
                  <img src={product.images[0]} className="w-12 h-12 rounded" />
                  <div>
                    <p className="font-semibold text-sm">
                      {v.name || v.attributes["battery capacity"]}
                    </p>
                    <p className="text-xs text-gray-500">SKU: {v.sku}</p>
                  </div>
                </div>

                <input
                  type="number"
                  value={v.stock}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val < 0) return toast.error("Stock cannot be negative!");
                    setVariantList((prev) =>
                      prev.map((item) =>
                        item._id === v._id ? { ...item, stock: val } : item
                      )
                    );
                  }}
                  className="p-2 bg-gray-50 rounded border"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end mt-5 gap-3">
          <button onClick={closeStockModal} className="px-5 py-2 bg-gray-200 rounded">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-5 py-2 bg-orange-600 text-white rounded">
            {isLoading ? "Updating..." : "OK"}
          </button>
        </div>

      </div>
    </div>
  );
}
