import React, { useState } from "react";
import { category } from "../../pages/Category/categoryData";
import SingleCategory from "./SingleCategory";

const CategoryList = () => {
  const [categorys, setCategorys] = useState(category);
  return (
    <table className="table static">
      <thead className="text-[#111] text-[16px]">
        <tr>
          <th scope="col" className="py-3 px-4 w-10 ">
            <input
              type="checkbox"
              className="checkbox rounded-xs border-gray-600 checkbox-xs"
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
