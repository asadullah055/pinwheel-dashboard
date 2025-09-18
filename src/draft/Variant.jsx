import { useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";
// Cartesian product function
function cartesian(arr) {
    if (arr.length === 0) return [];
    return arr.reduce((a, b) => a.flatMap((d) => b.map((e) => [...d, e])), [[]]);
}

// Grouped table row generator
function getGroupedRows(attributes) {
    if (attributes.length === 0) return [];
    if (attributes.length === 1) {
        return attributes[0].values.map((v) => [v]);
    }
    const [firstAttr, ...restAttrs] = attributes;
    const restCombinations = cartesian(
        restAttrs.map((attr) => (attr.values.length ? attr.values : [""]))
    );
    let rows = [];
    firstAttr.values.forEach((val) => {
        restCombinations.forEach((comb) => {
            rows.push([val, ...comb]);
        });
    });
    return rows;
}

export default function UnifiedVariantComponent() {
    // Dynamic attributes state
    const [attributes, setAttributes] = useState([]);

    // Table data state
    const [variantData, setVariantData] = useState({});

    // Apply All state
    const [applyAll, setApplyAll] = useState({
        price: "",
        discountPrice: "",
        stock: "",
        sku: "",
    });

    // Availability state
    const [availability, setAvailability] = useState(true);

    // Add new attribute
    const addAttribute = () => {
        if (attributes.length < 3) {
            setAttributes([...attributes, { name: "", values: [] }]);
        }
    };

    // Remove attribute
    const removeAttribute = (idx) => {
        setAttributes(attributes.filter((_, i) => i !== idx));
    };

    // Update attribute name
    const updateAttrName = (idx, value) => {
        setAttributes(
            attributes.map((attr, i) => (i === idx ? { ...attr, name: value } : attr))
        );
    };

    // Add value to attribute (case sensitive)
    const addAttrValue = (idx, value) => {
        if (!value.trim()) return;
        const trimmedValue = value.trim();
        setAttributes(
            attributes.map((attr, i) =>
                i === idx && !attr.values.some(v => v.toLowerCase() === trimmedValue.toLowerCase())
                    ? { ...attr, values: [...attr.values, trimmedValue] }
                    : attr
            )
        );
    };

    // Remove value from attribute
    const removeAttrValue = (attrIdx, valueIdx) => {
        setAttributes(
            attributes.map((attr, i) =>
                i === attrIdx
                    ? { ...attr, values: attr.values.filter((_, vi) => vi !== valueIdx) }
                    : attr
            )
        );
    };

    // Total number of variants


    // Table rows
    const rows =
        attributes.length === 0 || attributes.every((a) => a.values.length === 0)
            ? []
            : getGroupedRows(attributes);

    // Validation function for price
    const validatePrice = (price, discountPrice) => {
        if (!price || !discountPrice) return true;
        return parseFloat(price) > parseFloat(discountPrice);
    };
    const totalVariants = rows.length || 1;
    // Handle input change
    const handleChange = (key, field, value) => {
        setVariantData({
            ...variantData,
            [key]: { ...variantData[key], [field]: value },
        });
    };

    // Apply All handler
    const handleApplyAll = () => {
        if (rows.length === 0) {
            setVariantData({
                single: {
                    price: applyAll.price,
                    discountPrice: applyAll.discountPrice,
                    stock: applyAll.stock,
                    sku: applyAll.sku,
                },
            });
        } else {
            const newData = {};
            rows.forEach((row) => {
                const key = row.join("|");
                let sku = applyAll.sku;
                if (sku) {
                    sku += "-" + row.join("-");
                }
                newData[key] = {
                    price: applyAll.price,
                    discountPrice: applyAll.discountPrice,
                    stock: applyAll.stock,
                    sku: sku,
                };
            });
            setVariantData(newData);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-4 space-y-6">
            {/* Variant Attributes Section */}
            <div className="border border-gray-300 rounded bg-white">
                <p className="p-4 font-semibold text-gray-800 bg-gray-200">
                    Product Variants
                </p>
                <div className="px-4 py-2">
                    <p className="text-gray-700 text-sm mb-1">
                        You can add variants to a product that has more than one option, such as size or color.
                    </p>
                    <button
                        type="button"
                        className={`px-2 py-1 rounded border-blue-600 border flex gap-2 items-center ${attributes.length >= 3 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-50'
                            }`}
                        onClick={addAttribute}
                        disabled={attributes.length >= 3}
                    >
                        <FiPlus size={20} />
                        Add Variant ({attributes.length}/3)
                    </button>
                </div>


                {/* Attribute Input Section */}
                {attributes.map((attr, idx) => (
                    <div key={idx} className="px-4 py-2 bg-gray-50 border-t">
                        <div className="flex items-center gap-2 mb-2">
                            <input
                                className="border p-2 rounded w-48 text-sm"
                                placeholder="Attribute Name (e.g., Size, Color)"
                                value={attr.name}
                                onChange={(e) => updateAttrName(idx, e.target.value)}
                            />
                            <button
                                type="button"
                                className="text-red-500 hover:text-red-700"
                                onClick={() => removeAttribute(idx)}
                            >
                                <FiX size={16} />
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {attr.values.map((val, vIdx) => (
                                <span
                                    key={vIdx}
                                    className="bg-blue-100 px-2 py-1 rounded flex items-center text-sm capitalize"
                                >
                                    {val}
                                    <button
                                        type="button"
                                        className="ml-1 text-red-500 hover:text-red-700"
                                        onClick={() => removeAttrValue(idx, vIdx)}
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                            <input
                                className="border p-1 rounded w-32 text-sm"
                                placeholder="Add value"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        addAttrValue(idx, e.target.value.trim());
                                        e.target.value = "";
                                    }
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Price, Stock & Variants Section */}
            <div className="border border-gray-300 rounded bg-white pb-3">
                <p className="p-4 font-semibold text-gray-800 bg-gray-200">
                    Price, Stock & Variants
                </p>

                {/* Apply All Controls - Only show if there are 2 or more variants */}
                {totalVariants >= 2 && (
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

                        {/* Special Price */}
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

                        {/* Seller SKU */}
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

                        {/* Apply To All Button */}
                        <button
                            type="button"
                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm font-medium"
                            onClick={handleApplyAll}
                        >
                            Apply To All
                        </button>
                    </div>
                )}
                <div className="px-4 overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300 text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                {attributes.map((attr, i) => (
                                    <th key={i} className="border border-gray-300 p-2 text-left capitalize">
                                        {attr.name || `Attribute ${i + 1}`}
                                    </th>
                                ))}
                                <th className="border border-gray-300 p-2 text-left capitalize">Price</th>
                                <th className="border border-gray-300 p-2 text-left capitalize">Discount Price</th>
                                <th className="border border-gray-300 p-2 text-left capitalize">Stock</th>
                                <th className="border border-gray-300 p-2 text-left capitalize">Shop SKU</th>
                                <th className="border border-gray-300 p-2 text-left capitalize">Availability</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.length === 0 ? (
                                // Single product row when no variants
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
                                                    ? 'border-red-500 focus:ring-red-300'
                                                    : 'focus:ring-blue-300'
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

                                    {/* Availability */}
                                    <td className="border border-gray-300 p-2 text-center">
                                        <button
                                            type="button"
                                            onClick={() => setAvailability(prev => !prev)}
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
                            ) : (
                                // Multiple variant rows
                                rows.map((row, rowIdx) => {
                                    const key = row.join("|");
                                    return (
                                        <tr key={key}>
                                            {attributes.map((attr, colIdx) => {
                                                if (colIdx === 0) {
                                                    // Rowspan logic for first column
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
                                                                {row[colIdx]}
                                                            </td>
                                                        );
                                                    } else {
                                                        return null;
                                                    }
                                                } else {
                                                    return (
                                                        <td key={colIdx} className="border border-gray-300 p-2 uppercase">
                                                            {row[colIdx]}
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
                                                        className={`w-full px-2 py-1 border rounded-md focus:outline-none focus:ring ${!validatePrice(variantData[key]?.price, variantData[key]?.discountPrice)
                                                            ? 'border-red-500 focus:ring-red-300'
                                                            : 'focus:ring-blue-300'
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
                                                    className={`w-full px-2 py-1 border rounded-md focus:outline-none focus:ring ${!validatePrice(variantData[key]?.price, variantData[key]?.discountPrice)
                                                        ? 'border-red-500 focus:ring-red-300'
                                                        : 'focus:ring-blue-300'
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

                                            {/* Availability */}
                                            <td className="border border-gray-300 p-2 text-center">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setVariantData(prev => {
                                                            const newData = { ...prev };
                                                            if (!newData[key]) newData[key] = {};
                                                            newData[key].availability = newData[key].availability === false ? true : false;
                                                            return newData;
                                                        });
                                                    }}
                                                    className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${variantData[key]?.availability !== false ? "bg-green-500" : "bg-gray-400"
                                                        }`}
                                                >
                                                    <span
                                                        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-300 ${variantData[key]?.availability !== false ? "translate-x-6" : "translate-x-0"
                                                            }`}
                                                    />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Validation Message */}
                {(rows.length === 0 && !validatePrice(variantData["single"]?.price, variantData["single"]?.discountPrice)) && (
                    <div className="px-4 pb-2">
                        <p className="text-red-500 text-sm">Price must be higher than Discount Price</p>
                    </div>
                )}

                {rows.length > 0 && rows.some(row => {
                    const key = row.join("|");
                    return !validatePrice(variantData[key]?.price, variantData[key]?.discountPrice);
                }) && (
                        <div className="px-4 pb-2">
                            <p className="text-red-500 text-sm">Price must be higher than Discount Price for all variants</p>
                        </div>
                    )}
            </div>
        </div>
    );
}