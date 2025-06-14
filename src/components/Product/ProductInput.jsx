const ProductInput = ({
  title,
  placeholder,
  star,
  name,
  value,
  onChange,
  error,
}) => (
  <div className="mb-2">
    {title && (
      <label className="font-medium mb-2 block">
        {title} {star && <span className="text-red-500">*</span>}
      </label>
    )}
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full border border-gray-300 ${
        error && "border-red-500"
      } rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500 text-sm`}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default ProductInput;
