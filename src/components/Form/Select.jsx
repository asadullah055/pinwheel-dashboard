import { Controller } from "react-hook-form";

const Select = ({
    title,
    star,
    name,
    control,
    options,
    error,
    htmlFor,
    rules,
}) => {
    const id = htmlFor || name;

    return (
        <div className="mb-4 w-full">
            <label htmlFor={id} className="font-medium mb-2 block">
                {title} {star && <span className="text-red-500">*</span>}
            </label>

            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field }) => (
                    <select
                        {...field}
                        id={id}
                        className={`w-full border ${error ? "border-red-500" : "border-gray-300"
                            } p-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-200`}
                    >
                        <option value="">Select {title}</option>
                        {options.map((item) => (
                            <option key={item._id} value={item._id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                )}
            />

            {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
        </div>
    );
};

export default Select;
