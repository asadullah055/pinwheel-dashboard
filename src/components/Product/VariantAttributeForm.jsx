import { FiPlus, FiX } from "react-icons/fi";

const VariantAttributeForm = ({ attributes, addAttribute, removeAttribute, updateAttrName, addAttrValue, removeAttrValue }) => {
    return (
        <div className="py-2 bg-white">
            <div className="px-4 py-2">
                <p className="text-gray-700 text-sm mb-1">
                    You can add variants to a product that has more than one option, such as size or color.
                </p>
                <button
                    type="button"
                    className={`px-2 py-1 rounded border-blue-600 border flex gap-2 items-center ${attributes.length >= 3 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-50"}`}
                    onClick={addAttribute}
                    disabled={attributes.length >= 3}
                >
                    <FiPlus size={20} /> Add Variant ({attributes.length}/3)
                </button>
            </div>

            {attributes.map((attr, idx) => (
                <div key={idx} className="px-4">
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
                            <span key={vIdx} className="bg-blue-100 px-2 py-1 rounded flex items-center text-sm capitalize">
                                {val}
                                <button
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
                                    e.preventDefault(); // 🔥 Enter চাপলে form submit বন্ধ করো
                                    addAttrValue(idx, e.target.value.trim());
                                    e.target.value = "";
                                }
                            }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default VariantAttributeForm;