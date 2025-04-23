import React from "react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

const SingleBrand = ({ brand }) => {
  const { name, image, quantity, status, sale } = brand || "";
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
        {quantity || 0}
      </td>
      <td scope="col" className="py-3 px-4">
        {sale || 0}
      </td>
      <td scope="col" className="py-3 px-4 ">
        <span
          className={`border p-2 capitalize inline-block w-20 text-center rounded-lg ${
            status === "inactive"
              ? "text-red-500 border-red-500"
              : "text-green-500 border-green-500"
          } font-semibold`}
        >
          {status}
        </span>
      </td>
      <td scope="col" className="py-3 px-4">
        <div className="flex items-center gap-2">
          <span className="text-blue-500">
            <FaRegEdit size={20} />
          </span>
          <span className="text-red-500">
            <FaRegTrashAlt size={20} />
          </span>
        </div>
      </td>
    </tr>
  );
};

export default SingleBrand;
