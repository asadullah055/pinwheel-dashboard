import React from "react";

const SingleCategory = ({ category }) => {
  const { name, image, quantity, status, sale } = category || "";
  return (
    <tr>
      <td scope="col" className="py-3 px-4 w-10 ">
        <input
          type="checkbox"
          className="checkbox  rounded-xs border-gray-600 checkbox-xs"
        />
      </td>
      <td scope="col" className="py-3 px-4">
        {name}
      </td>
      <td scope="col" className="py-3 px-4">
        <img className="h-[50px] w-[50px]" src={image} alt="" />
      </td>
      <td scope="col" className="py-3 px-4">
        {quantity}
      </td>
      <td scope="col" className="py-3 px-4">
        {sale}
      </td>
      <td scope="col" className="py-3 px-4">
        <span
          className={`border p-2 capitalize w-20 text-center inline-block rounded-lg ${
            status === "inactive"
              ? "text-red-500 border-red-500"
              : "text-green-500 border-green-500"
          } font-semibold`}
        >
          {status}
        </span>
      </td>
      <td scope="col" className="py-3 px-4">
        Action
      </td>
    </tr>
  );
};

export default SingleCategory;
