import React, { useState } from "react";
import Pagination from "../Pagination";
import SingleBrand from "./SingleBrand";

const BrandList = ({
  AllBrands,
  setCurrentPage,
  setPerPage,
  currentPage,
  perPage,
  totalBrands,
}) => {
  const [brands, setBrands] = useState(AllBrands);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePerPageChange = (itemsPerPage) => {
    setPerPage(itemsPerPage);
    setCurrentPage(1); // Reset to page 1 when perPage changes
  };
  return (
    <>
      <table className="table static">
        <thead className="text-[#111] text-[16px]">
          <tr>
            <th scope="col" className="py-3 px-4 w-10 ">
              <input
                type="checkbox"
                className="checkbox  rounded-xs border-gray-600 checkbox-xs"
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
          {brands.map((brand) => (
            <SingleBrand key={brand._id} brand={brand} />
          ))}
        </tbody>
      </table>
      {totalBrands > perPage && (
        <Pagination
          currentPage={currentPage}
          totalItems={totalBrands}
          onPageChange={handlePageChange}
          perPage={perPage}
          onPerPageChange={handlePerPageChange}
        />
      )}
    </>
  );
};

export default BrandList;
