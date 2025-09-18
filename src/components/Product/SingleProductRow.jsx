// SingleProductRow.jsx

const SingleProductRow = ({ attributes, variantData, handleChange, validatePrice, toggleAvailability }) => {
    const availability = variantData["single"]?.availability !== false;
    return (
        <tr>
            {attributes.map((_, i) => (
                <td key={i} className="border border-gray-300 p-2"></td>
            ))}

            {/* Price */}
            <td className="border border-gray-300 p-2">
                <div className="flex items-center space-x-1">
                    <span className="text-gray-600">৳</span>
                    <input
                        type="text"
                        className={`w-full px-2 py-1 border rounded-md focus:outline-none focus:ring ${!validatePrice(variantData["single"]?.price, variantData["single"]?.discountPrice)
                            ? "border-red-500 focus:ring-red-300"
                            : "focus:ring-blue-300"
                            }`}
                        value={variantData["single"]?.price || ""}
                        onChange={(e) => handleChange("single", "price", e.target.value)}
                    />
                </div>
            </td>

            {/* Discount Price */}
            <td className="border border-gray-300 p-2">
                <input
                    type="text"
                    className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    value={variantData["single"]?.discountPrice || ""}
                    onChange={(e) => handleChange("single", "discountPrice", e.target.value)}
                />
            </td>

            {/* Stock */}
            <td className="border border-gray-300 p-2">
                <input
                    type="text"
                    className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    value={variantData["single"]?.stock || ""}
                    onChange={(e) => handleChange("single", "stock", e.target.value)}
                />
            </td>

            {/* Shop SKU */}
            <td className="border border-gray-300 p-2">
                <input
                    type="text"
                    className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    value={variantData["single"]?.sku || ""}
                    onChange={(e) => handleChange("single", "sku", e.target.value)}
                    maxLength={200}
                />
            </td>

            {/* Availability Toggle */}
            <td className="border border-gray-300 p-2 text-center">
                <button
                    type="button"
                    onClick={() => toggleAvailability("single")}
                    className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${availability ? "bg-green-500" : "bg-gray-400"
                        }`}
                >
                    <span
                        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-300 ${availability ? "translate-x-6" : "translate-x-0"
                            }`}
                    />
                </button>
            </td>
        </tr>

    );
};

export default SingleProductRow;