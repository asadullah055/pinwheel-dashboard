import React, { useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BrandList from "../../components/Brand/BrandList";
import { getAllBrands } from "../../features/Brand/brandslice";

const Brand = () => {
  const dispatch = useDispatch();
  const { isError, isLoading, AllBrands, totalBrands } = useSelector(
    (state) => state.brand
  );
  // const [brands, setBrand] = useState([AllBrands]);

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    dispatch(getAllBrands({ page: currentPage, limit: perPage }));
  }, [dispatch, currentPage, perPage]);

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
          {AllBrands && AllBrands.length === 0 && !isError && (
            <div className="flex justify-center items-center h-96">
              <p className="text-gray-500">No brands available</p>
            </div>
          )}
          {/* Loading and Error Handling */}
          {isLoading ? (
            <div className="flex justify-center items-center h-96">
              <svg
                className="animate-spin h-10 w-10 text-blue-500"
                viewBox="3 3 18 18"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  d="M12 3v2a7.001 7.001 0 0 1 0 14v2a9.001 9.001 0 0 0 0-18z"
                />
              </svg>
            </div>
          ) : isError ? (
            <div className="text-red-500 text-center">Error loading brands</div>
          ) : (
            <BrandList
              AllBrands={AllBrands}
              setPerPage={setPerPage}
              totalBrands={totalBrands}
              currentPage={currentPage}
              perPage={perPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Brand;
