import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { useUpdatePriceAndStockMutation } from "../../features/product/productApi";

export default function PriceModal({ product, closeModal }) {
  const hasVariants = product?.variants?.length > 1;
  console.log(product);

  const [updatePriceAndStock, { isLoading }] = useUpdatePriceAndStockMutation();
  // VARIANT STATE
  const [variantList, setVariantList] = useState(
    product?.variants?.map((v) => ({
      ...v,
      price: Number(v.price),
      discountPrice: Number(v.discountPrice),
    })) || []
  );

  // GLOBAL INPUTS
  const [globalRetail, setGlobalRetail] = useState("");
  const [globalDiscount, setGlobalDiscount] = useState("");

  // SEARCH
  const [search, setSearch] = useState("");

  const filteredVariants = useMemo(() => {
    return variantList.filter((item) =>
      item.sku.toLowerCase().includes(search.toLowerCase())
    );
  }, [variantList, search]);

  // APPLY TO ALL BUTTON FUNCTION
  const applyToAll = () => {
    // VALIDATE global fields first
    if (globalRetail !== "" && Number(globalRetail) < 0) {
      toast.error("Retail price cannot be negative!");
      return;
    }

    if (globalDiscount !== "" && Number(globalDiscount) < 0) {
      toast.error("Discount price cannot be negative!");
      return;
    }

    if (globalRetail !== "" && globalDiscount !== "") {
      if (Number(globalDiscount) > Number(globalRetail)) {
        toast.error("Discount cannot be greater than retail price!");
        return;
      }
    }

    setVariantList((prev) =>
      prev.map((v) => ({
        ...v,

        // ALWAYS set retail if provided
        price: globalRetail !== "" ? Number(globalRetail) : v.price,

        // ONLY set discount if provided
        discountPrice:
          globalDiscount !== ""
            ? Number(globalDiscount)
            : v.discountPrice,
      }))
    );

    toast.success("Applied to all variants!");
  };


  // SUBMIT HANDLER
  const handleSubmit = async () => {
    for (let v of variantList) {
      if (v.price < 0 || isNaN(v.price)) {
        toast.error("Invalid Retail Price");
        return;
      }
      if (v.discountPrice < 0 || isNaN(v.discountPrice)) {
        toast.error("Invalid Discount Price");
        return;
      }
      if (v.discountPrice > v.price) {
        toast.error("Discount price cannot exceed retail price");
        return;
      }
    }
    try {
      const res = await updatePriceAndStock({
        id: product._id,
        variants: variantList.map((v) => ({
          _id: v._id,
          price: v.price,
          discountPrice: v.discountPrice,
        })),
      }).unwrap();

      toast.success("Prices updated successfully!");
      closeModal();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update prices");
    }

  };


  // SINGLE PRODUCT CASE
  // SINGLE PRODUCT STYLE BUT WITH MULTI-VARIANT STRUCTURE
  if (!hasVariants) {
    const single = variantList[0]; // single price row

    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white w-[900px] rounded-lg shadow-xl p-6 relative max-h-[90vh] flex flex-col">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Edit Price</h2>
            <button onClick={closeModal}><IoClose size={26} /></button>
          </div>

          {/* TABLE HEADER (same as multi variant) */}
          <div className="grid grid-cols-3 bg-gray-100 p-3 font-semibold text-sm rounded">
            <div>Product Info</div>
            <div>Retail Price</div>
            <div>Discount Price</div>
          </div>

          {/* SINGLE ROW LIKE MULTI-VARIANT */}
          <div className="grid grid-cols-3 items-center gap-3 p-3 border-b">

            {/* PRODUCT INFO */}
            <div className="flex items-center gap-3">
              <img
                src={product.images?.[0]}
                className="w-12 h-12 rounded"
              />
              <div>
                <p className="font-semibold text-sm">
                  {product.productName ||
                    "Single Product"}
                </p>
                <p className="text-xs text-gray-500">
                  SKU: {single.sku || "N/A"}
                </p>
              </div>
            </div>

            {/* RETAIL PRICE */}
            <input
              type="number"
              value={single.price}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (val < 0) return toast.error("Retail cannot be negative!");

                setVariantList([{ ...single, price: val }]);
              }}
              onWheel={(e) => e.target.blur()}
              className="p-2 bg-gray-50 rounded focus:ring-0 focus:border-transparent outline-none border"
            />

            {/* DISCOUNT PRICE */}
            <input
              type="number"
              value={single.discountPrice}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (val < 0) return toast.error("Discount cannot be negative!");


                setVariantList([{ ...single, discountPrice: val }]);
              }}
              onWheel={(e) => e.target.blur()}
              className="p-2 bg-gray-50 rounded focus:ring-0 focus:border-transparent outline-none border"
            />
          </div>

          {/* FOOTER BUTTONS */}
          <div className="flex justify-end mt-5 gap-3">
            <button onClick={closeModal} className="px-5 py-2 bg-gray-200 rounded">
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


  // VARIANT CASE
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[900px] rounded-lg shadow-xl p-6 relative max-h-[90vh] flex flex-col">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Price</h2>
          <button onClick={closeModal}><IoClose size={26} /></button>
        </div>


        {
          hasVariants && (
            <>
              {/* SEARCH */}
              <input
                type="text"
                placeholder="Variant Name / Seller SKU / Shop SKU"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border px-3 py-2 rounded mb-4"
              />

              {/* GLOBAL INPUT + APPLY BUTTON */}
              <div className="flex gap-4 mb-4">
                {/* GLOBAL RETAIL INPUT */}
                <input
                  type="number"
                  placeholder="৳ Retail Price"
                  value={globalRetail}
                  onChange={(e) => {
                    const val = e.target.value;

                    if (val < 0) {
                      toast.error("Retail price cannot be negative!");
                      return;
                    }

                    if (globalDiscount && Number(globalDiscount) > Number(val)) {
                      toast.error("Retail price must be higher than discount!");
                      return;
                    }

                    setGlobalRetail(val);
                  }}
                  onWheel={(e) => e.target.blur()}
                  className="px-4 py-2 bg-gray-100 rounded-lg
              focus:ring-0 focus:border-transparent outline-none border"
                />

                {/* GLOBAL DISCOUNT INPUT */}
                <input
                  type="number"
                  placeholder="৳ Discount Price"
                  value={globalDiscount}
                  onChange={(e) => {
                    const val = e.target.value;

                    if (val < 0) {
                      toast.error("Discount price cannot be negative!");
                      return;
                    }

                    if (globalRetail && Number(val) > Number(globalRetail)) {
                      toast.error("Discount cannot be greater than retail price!");
                      return;
                    }

                    setGlobalDiscount(val);
                  }}
                  onWheel={(e) => e.target.blur()}
                  className="px-4 py-2 bg-gray-100 rounded-lg
              focus:ring-0 focus:border-transparent outline-none border"
                />

                <button
                  onClick={applyToAll}
                  disabled={globalRetail === "" && globalDiscount === ""}
                  className={`
                px-3 py-2 text-sm rounded-lg border  
                ${globalRetail === "" && globalDiscount === ""
                      ? "text-gray-400 border-gray-300 opacity-50 cursor-not-allowed"
                      : "text-orange-500 border-orange-500 cursor-pointer hover:bg-orange-500 hover:text-white transition"}
                  `}
                >
                  Apply to All
                </button>
              </div>
            </>
          )
        }
        {/* SCROLLABLE VARIANT LIST */}
        <div className="overflow-y-auto mt-2 border relative rounded-md">
          <div className="grid grid-cols-3 bg-gray-100 p-3 font-semibold text-sm sticky top-0">
            <div>Product Info</div>
            <div>Retail Price</div>
            <div>Discount Price</div>
          </div>

          <div className="" style={{ maxHeight: "35vh" }}>
            {filteredVariants.map((v) => (
              <div key={v._id} className="grid grid-cols-3 items-center gap-3 p-3 border-b">

                <div className="flex items-center gap-3">
                  <img src={product.images[0]} className="w-12 h-12 rounded" />
                  <div>
                    <p className="font-semibold text-sm">
                      {Object.values(v.attributes).join(" ")}
                    </p>
                    <p className="text-xs text-gray-500">SKU: {v.sku}</p>
                  </div>
                </div>

                {/* INDIVIDUAL RETAIL PRICE */}
                <input
                  type="number"
                  value={v.price}
                  onChange={(e) => {
                    const val = Number(e.target.value);

                    if (val < 0 || isNaN(val)) return;

                    /* if (v.discountPrice > val) {
                      toast.error("Discount cannot exceed retail price!");
                      return;
                    } */

                    setVariantList((prev) =>
                      prev.map((item) =>
                        item._id === v._id
                          ? { ...item, price: val }
                          : item
                      )
                    );
                  }}
                  onWheel={(e) => e.target.blur()}
                  className="p-2 bg-gray-50 rounded focus:ring-0 focus:border-transparent outline-none border"
                />

                {/* INDIVIDUAL DISCOUNT PRICE */}
                <input
                  type="number"
                  value={v.discountPrice}
                  onChange={(e) => {
                    const val = Number(e.target.value);

                    if (val < 0 || isNaN(val)) return;

                    /*  if (val > v.price) {
                       toast.error("Discount cannot exceed retail price!");
                       return;
                     } */

                    setVariantList((prev) =>
                      prev.map((item) =>
                        item._id === v._id
                          ? { ...item, discountPrice: val }
                          : item
                      )
                    );
                  }}
                  onWheel={(e) => e.target.blur()}
                  className="p-2 bg-gray-50 rounded focus:ring-0 focus:border-transparent outline-none border"
                />

              </div>
            ))}
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end mt-5 gap-3">
          <button onClick={closeModal} className="px-5 py-2 bg-gray-200 rounded">
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
