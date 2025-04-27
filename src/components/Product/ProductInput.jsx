import React from "react";

const ProductInput = ({ title, placeholder, name, value, onChange }) => {
  return (
    <div className="mb-4">
      {title && <label className="title">{title}</label>}
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500 text-sm"
      />
    </div>
  );
};

export default React.memo(ProductInput);
