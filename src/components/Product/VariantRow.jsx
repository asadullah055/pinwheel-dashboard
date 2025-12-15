const VariantRow = ({ 
  row, 
  rowIdx, 
  rows, 
  attributes, 
  variantData, 
  handleChange, 
  validatePrice, 
  toggleAvailability 
}) => {
  // 🔥 FIX: Normalize the key to lowercase to match variantData keys
  const key = row.map(val => val.toLowerCase()).join("|");
  
  const availability = variantData[key]?.availability !== false;

  return (
    <tr>
      {attributes.map((attr, colIdx) => {
        if (colIdx === 0) {
          // প্রথম কলামের জন্য rowspan লজিক
          const value = row[0];
          if (rowIdx === 0 || rows[rowIdx - 1][0] !== value) {
            let count = 1;
            for (let i = rowIdx + 1; i < rows.length; i++) {
              if (rows[i][0] === value) count++;
              else break;
            }
            return (
              <td
                key={colIdx}
                className="border border-gray-300 p-2 font-semibold text-gray-700 bg-gray-50"
                rowSpan={count}
              >
                {row[colIdx]} {/* Display original case */}
              </td>
            );
          } else {
            return null; // ডুপ্লিকেট হলে স্কিপ করবো
          }
        } else {
          return (
            <td key={colIdx} className="border border-gray-300 p-2">
              {row[colIdx]} {/* Display original case */}
            </td>
          );
        }
      })}

      {/* Price */}
      <td className="border border-gray-300 p-2">
        <div className="flex items-center space-x-1">
          <span className="text-gray-600">৳</span>
          <input
            type="text"
            className={`w-full px-2 py-1 border rounded-md focus:outline-none focus:ring ${
              !validatePrice(variantData[key]?.price, variantData[key]?.discountPrice)
                ? "border-red-500 focus:ring-red-300"
                : "focus:ring-blue-300"
            }`}
            value={variantData[key]?.price || ""}
            onChange={(e) => handleChange(key, "price", e.target.value)}
          />
        </div>
      </td>

      {/* Discount Price */}
      <td className="border border-gray-300 p-2">
        <input
          type="text"
          className={`w-full px-2 py-1 border rounded-md focus:outline-none focus:ring ${
            !validatePrice(variantData[key]?.price, variantData[key]?.discountPrice)
              ? "border-red-500 focus:ring-red-300"
              : "focus:ring-blue-300"
          }`}
          value={variantData[key]?.discountPrice || ""}
          onChange={(e) => handleChange(key, "discountPrice", e.target.value)}
        />
      </td>

      {/* Stock */}
      <td className="border border-gray-300 p-2">
        <input
          type="text"
          className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          value={variantData[key]?.stock || ""}
          onChange={(e) => handleChange(key, "stock", e.target.value)}
        />
      </td>

      {/* Shop SKU */}
      <td className="border border-gray-300 p-2">
        <input
          type="text"
          className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          value={variantData[key]?.sku || ""}
          onChange={(e) => handleChange(key, "sku", e.target.value)}
          maxLength={200}
        />
      </td>

      {/* Availability Toggle */}
      <td className="border border-gray-300 p-2 text-center">
        <button
          type="button"
          onClick={() => toggleAvailability(key)}
          className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
            availability ? "bg-green-500" : "bg-gray-400"
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-300 ${
              availability ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>
      </td>
    </tr>
  );
};

export default VariantRow;