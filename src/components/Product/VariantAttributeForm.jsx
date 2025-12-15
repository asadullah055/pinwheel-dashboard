import { useRef } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiPlus, FiX } from "react-icons/fi";

const VariantAttributeForm = ({ attributes, addAttribute, removeAttribute, updateAttrName, addAttrValue, removeAttrValue }) => {
    const inputRefs = useRef({});

    const handleAddValue = (idx, inputElement) => {
        const value = inputElement.value.trim();
        if (value) {
            addAttrValue(idx, value);
            inputElement.value = "";
            inputElement.focus();
        }
    };

    return (
        <div className="py-2 bg-white">
            <div className="px-4 py-2">
                <p className="text-gray-700 text-sm mb-2">
                    You can add variants to a product that has more than one option, such as size or color.
                </p>
                <button
                    type="button"
                    onClick={addAttribute}
                    disabled={attributes.length >= 3}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all
    border border-blue-200
    ${attributes.length >= 3
                            ? " text-blue-500 cursor-not-allowed opacity-60"
                            : "bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white"}`
                    }
                >
                    <FiPlus size={18} />
                    <span>Add Variant ({attributes.length}/3)</span>
                </button>
            </div>

            {attributes.map((attr, idx) => (
                <div key={idx} className="bg-white border border-gray-200 rounded-md shadow-sm px-4 py-3 mb-3 transition-shadow hover:shadow-md w-3/4 ms-4">
                    <div className="flex items-center gap-2 mb-2 pb-2">
                        <input
                            className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-100 p-2 rounded text-sm outline-none transition w-3/4"
                            placeholder="Attribute Name (e.g., Size, Color)"
                            value={attr.name}
                            onChange={(e) => updateAttrName(idx, e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                }
                            }}
                        />
                        <button
                            type="button"
                            className="text-red-500 hover:text-white hover:bg-red-500 p-2 rounded-full transition"
                            onClick={() => removeAttribute(idx)}
                        >
                            <FaRegTrashAlt size={16} />
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {attr.values.map((val, vIdx) => (
                            <span key={vIdx} className="bg-blue-50 border border-blue-200 text-blue-700 px-2 rounded-full flex items-center text-sm  transition">
                                {val}
                                <button
                                    type="button"
                                    className="ml-1 text-red-400 hover:text-red-600 transition"
                                    onClick={() => removeAttrValue(idx, vIdx)}
                                >
                                    <FiX size={16} />
                                </button>
                            </span>
                        ))}
                        <div className="flex items-center gap-1">
                            <input
                                ref={(el) => (inputRefs.current[idx] = el)}
                                className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-100 p-1.5 rounded w-32 outline-none transition"
                                placeholder="Add value"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        handleAddValue(idx, e.target);
                                    }
                                }}
                            />
                            <button
                                type="button"
                                className="bg-blue-500 hover:bg-blue-600 text-white p-1.5 rounded transition flex items-center justify-center"
                                onClick={() => handleAddValue(idx, inputRefs.current[idx])}
                                title="Add value"
                            >
                                <FiPlus size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default VariantAttributeForm;