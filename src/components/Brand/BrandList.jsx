import React, { useState } from "react";
import { brand } from "../../pages/Brand/brandData";
import Pagination from "../Pagination";
import SingleBrand from "./SingleBrand";

const BrandList = () => {
  const [brands, setBrands] = useState(brand);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const totalItems = 150; // Example total items; replace with actual data count

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePerPageChange = (itemsPerPage) => {
    setPerPage(itemsPerPage);
    setCurrentPage(1); // Reset to page 1 when perPage changes
  };
  return (
    <>
      <Pagination
        currentPage={currentPage}
        totalItems={totalItems}
        onPageChange={handlePageChange}
        perPage={perPage}
        onPerPageChange={handlePerPageChange}
      />
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
            <SingleBrand key={brand.id} brand={brand} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default BrandList;
