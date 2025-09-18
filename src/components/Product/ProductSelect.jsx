import { Controller } from "react-hook-form";

const ProductSelect = ({ control, name, title, star, options, error }) => (
  <div className="mb-4 w-full">
    <label className="font-medium mb-2 block">
      {title} {star && <span className="text-red-500">*</span>}
    </label>
    <Controller
      name={name}
      control={control}
      rules={{ required: `${title} is required` }}
      render={({ field }) => (
        <select
          {...field}
          className={`w-full border ${error ? "border-red-500" : "border-gray-300"
            } p-2 rounded focus:outline-none`}
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

export default ProductSelect;
