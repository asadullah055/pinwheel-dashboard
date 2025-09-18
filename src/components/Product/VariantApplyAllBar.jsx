const VariantApplyAllBar = ({ applyAll, setApplyAll, handleApplyAll }) => {
    return (
        <div className="flex items-center gap-2 rounded-md px-4 py-2">
            {/* Price */}
            <div className="flex items-center border rounded px-2 py-1 bg-white">
                <span className="text-gray-600 mr-1">৳</span>
                <input
                    type="text"
                    placeholder="Price"
                    className="w-24 outline-none border-none focus:ring-0 text-sm"
                    value={applyAll.price}
                    onChange={(e) => setApplyAll({ ...applyAll, price: e.target.value })}
                />
            </div>

            {/* Discount Price */}
            <div className="flex items-center border rounded px-2 py-1 bg-white">
                <span className="text-gray-600 mr-1">৳</span>
                <input
                    type="text"
                    placeholder="Discount Price"
                    className="w-28 outline-none border-none focus:ring-0 text-sm"
                    value={applyAll.discountPrice}
                    onChange={(e) => setApplyAll({ ...applyAll, discountPrice: e.target.value })}
                />
            </div>

            {/* Stock */}
            <div className="flex items-center border rounded px-2 py-1 bg-white">
                <input
                    type="text"
                    placeholder="Stock"
                    className="w-20 outline-none border-none focus:ring-0 text-sm"
                    value={applyAll.stock}
                    onChange={(e) => setApplyAll({ ...applyAll, stock: e.target.value })}
                />
            </div>

            {/* SKU */}
            <div className="flex items-center border rounded px-2 py-1 bg-white">
                <input
                    type="text"
                    placeholder="SellerSKU"
                    maxLength={200}
                    className="w-40 outline-none border-none focus:ring-0 text-sm"
                    value={applyAll.sku}
                    onChange={(e) => setApplyAll({ ...applyAll, sku: e.target.value })}
                />
                <span className="ml-1 text-xs text-gray-400">
                    {applyAll.sku.length}/200
                </span>
            </div>

            <button
                type="button"
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm font-medium"
                onClick={handleApplyAll}
            >
                Apply To All
            </button>
        </div>
    );
};

export default VariantApplyAllBar;