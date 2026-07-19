import { useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import { FiCheck, FiChevronDown, FiSearch } from "react-icons/fi";

const Select = ({
    title,
    star,
    name,
    control,
    options = [],
    error,
    htmlFor,
    rules,
}) => {
    const id = htmlFor || name;
    const wrapperRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

    const validationRules = {
        required: star ? `${title} is required` : false,
        ...rules,
    };

    return (
        <Controller
            name={name}
            control={control}
            rules={validationRules}
            render={({ field }) => {
                const selectedOption = options.find(
                    (item) => String(item._id) === String(field.value)
                );
                const filteredOptions = options.filter((item) =>
                    item.name?.toLowerCase().includes(searchTerm.toLowerCase())
                );

                const selectOption = (value) => {
                    field.onChange(value);
                    setIsOpen(false);
                    setSearchTerm("");
                };

                return (
                    <div className="mb-4 w-full" ref={wrapperRef}>
                        <label htmlFor={id} className="font-medium mb-2 block">
                            {title} {star && <span className="text-red-500">*</span>}
                        </label>

                        <div className="relative">
                            <button
                                type="button"
                                id={id}
                                className={`flex h-11 w-full items-center justify-between rounded-md border bg-white px-3 text-left text-sm shadow-sm transition focus:outline-none focus:ring-2 ${
                                    error
                                        ? "border-red-500 focus:ring-red-100"
                                        : "border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-blue-100"
                                }`}
                                aria-haspopup="listbox"
                                aria-expanded={isOpen}
                                onClick={() => setIsOpen((current) => !current)}
                            >
                                <span
                                    className={
                                        selectedOption ? "text-gray-900" : "text-gray-400"
                                    }
                                >
                                    {selectedOption?.name || `Select ${title}`}
                                </span>
                                <FiChevronDown
                                    className={`text-gray-500 transition ${
                                        isOpen ? "rotate-180" : ""
                                    }`}
                                    size={18}
                                />
                            </button>

                            {isOpen && (
                                <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg">
                                    <div className="flex items-center gap-2 border-b border-gray-100 px-3 py-2">
                                        <FiSearch className="text-gray-400" size={16} />
                                        <input
                                            type="text"
                                            className="w-full border-none text-sm outline-none placeholder:text-gray-400 focus:ring-0"
                                            placeholder={`Search ${title}`}
                                            value={searchTerm}
                                            onChange={(event) => setSearchTerm(event.target.value)}
                                            autoFocus
                                        />
                                    </div>

                                    <div className="max-h-60 overflow-y-auto py-1" role="listbox">
                                        {!star && (
                                            <button
                                                type="button"
                                                className="flex w-full items-center justify-between px-3 py-2 text-left text-sm text-gray-500 hover:bg-gray-50"
                                                onClick={() => selectOption("")}
                                            >
                                                Select {title}
                                            </button>
                                        )}

                                        {filteredOptions.length > 0 ? (
                                            filteredOptions.map((item) => {
                                                const isSelected =
                                                    String(item._id) === String(field.value);

                                                return (
                                                    <button
                                                        type="button"
                                                        role="option"
                                                        aria-selected={isSelected}
                                                        key={item._id}
                                                        className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm transition ${
                                                            isSelected
                                                                ? "bg-blue-50 text-blue-700"
                                                                : "text-gray-700 hover:bg-gray-50"
                                                        }`}
                                                        onClick={() => selectOption(item._id)}
                                                    >
                                                        <span className="truncate">{item.name}</span>
                                                        {isSelected && <FiCheck size={16} />}
                                                    </button>
                                                );
                                            })
                                        ) : (
                                            <div className="px-3 py-3 text-sm text-gray-500">
                                                No {title.toLowerCase()} found
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {error && (
                            <p className="text-red-500 text-xs mt-1">{error.message}</p>
                        )}
                    </div>
                );
            }}
        />
    );
};

export default Select;
