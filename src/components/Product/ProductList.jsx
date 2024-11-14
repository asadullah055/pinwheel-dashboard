import React from "react";

const ProductList = () => {
  return (
    <table className="table static">
      <thead className="text-[#111] text-[16px]">
        <tr>
          <th scope="col" className="py-3 px-4 w-10 ">
            <input
              type="checkbox"
              className="checkbox-warning h-4 w-4 checkbox rounded-sm border-gray-400"
            />
          </th>
          <th scope="col" className="py-3 px-4 w-1/3">
            Product
          </th>
          <th scope="col" className="py-3 px-4">
            SKU
          </th>

          <th scope="col" className="py-3 px-4">
            Price
          </th>
          <th scope="col" className="py-3 px-4">
            Quantity
          </th>
          <th scope="col" className="py-3 px-4">
            Sales
          </th>
          <th scope="col" className="py-3 px-4">
            Status
          </th>

          <th scope="col" className="py-3 px-4 w-32">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td scope="col" className="py-3 px-4 w-10 ">
            <input
              type="checkbox"
              className="checkbox-warning h-4 w-4 checkbox rounded-sm border-gray-400"
            />
          </td>
          <td scope="col" className="py-3 px-4  w-1/3">
            Product
          </td>
          <td scope="col" className="py-3 px-4  ">
            #PH0012
          </td>

          <td scope="col" className="py-3 px-4  ">
            ৳ 520
          </td>
          <td scope="col" className="py-3 px-4  ">
            50
          </td>
          <td scope="col" className="py-3 px-4  ">
            20
          </td>
          <td scope="col" className="py-3 px-4  ">
            Active
          </td>

          <td scope="col" className="py-3 px-4  w-32">
            Action
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default ProductList;
