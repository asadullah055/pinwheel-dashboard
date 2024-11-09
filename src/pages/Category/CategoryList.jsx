import React, { useState } from "react";
import SingleCategory from "./SingleCategory";
import { category } from "./categoryData";

const CategoryList = () => {
  const [categorys, setCategorys] = useState(category);
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
          <th scope="col" className="py-3 px-4">
            Name
          </th>
          <th scope="col" className="py-3 px-4">
            Image
          </th>
          <th scope="col" className="py-3 px-4">
            Quantity
          </th>
          <th scope="col" className="py-3 px-4">
            Sale
          </th>
          <th scope="col" className="py-3 px-4">
            Status
          </th>
          <th scope="col" className="py-3 px-4">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {categorys.map((category) => (
          <SingleCategory key={category.id} category={category} />
        ))}
      </tbody>
    </table>
  );
};

export default CategoryList;
