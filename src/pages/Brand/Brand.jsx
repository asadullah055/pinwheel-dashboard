import React from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import BrandList from "./BrandList";

const Brand = () => {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-2xl">Brand List</h3>
          <p className="text-sm py-1">Manage your Brands</p>
        </div>
        <Link
          className="border py-2 px-3 bg-[#3577f0] text-white rounded-md font-semibold flex items-center gap-1"
          to={"/brand/create"}
        >
          <span className="text-xl">
            <IoIosAddCircleOutline className="font-semibold " />
          </span>{" "}
          Add Brand
        </Link>
      </div>
      <div className="bg-white p-2 rounded-md">
        <div className="overflow-x-auto">
          <BrandList />
        </div>
      </div>
    </div>
  );
};

export default Brand;
