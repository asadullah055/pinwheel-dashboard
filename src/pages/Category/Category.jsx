import React from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import CategoryList from "../../components/Category/CategoryList";

const Category = () => {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-2xl">Category List</h3>
          <p className="text-sm py-1">Manage your categories</p>
        </div>
        <Link
          className="border py-2 px-3 bg-[#3577f0] text-white rounded-md font-semibold flex items-center gap-1"
          to={"/category/create"}
        >
          <span className="text-xl">
            <IoIosAddCircleOutline className="font-semibold " />
          </span>{" "}
          Add Category
        </Link>
      </div>
      <div className="bg-white p-2 rounded-md">
        <div className="overflow-x-auto">
          <CategoryList />
        </div>
      </div>
    </div>
  );
};

export default Category;
