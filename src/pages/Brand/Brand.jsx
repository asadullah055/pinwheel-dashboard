import { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import BrandList from "../../components/Brand/BrandList"; // RTK Query hook

const Brand = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

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
          <IoIosAddCircleOutline className="text-xl" /> Add Brand
        </Link>
      </div>

      <div className="bg-white p-2 rounded-md">
        <div className="overflow-x-auto">
          <BrandList
            currentPage={currentPage}
            perPage={perPage}
            setCurrentPage={setCurrentPage}
            setPerPage={setPerPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Brand;
