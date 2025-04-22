import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Pagination = ({
  currentPage,
  totalItems,
  onPageChange,
  perPage,
  onPerPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / perPage);
  //   get pagination number
  const getPaginationNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 3;
    if (totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= maxVisiblePages + 1) {
        for (let i = 1; i <= maxVisiblePages + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages - 1, totalPages);
      } else if (currentPage >= totalPages - maxVisiblePages) {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = totalPages - maxVisiblePages; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages - 1, totalPages);
      }
    }
    return pageNumbers;
  };

  const pageNumbers = getPaginationNumbers();

  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      <label htmlFor="perPage" className="text-sm mr-2">
        Items per page:
      </label>
      {/* show per page */}
      <select
        id="perPage"
        value={perPage}
        onChange={(e) => onPerPageChange(Number(e.target.value))}
        className="border rounded-sm px-2 py-1 bg-white focus:outline-hidden"
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select>
      {/* pagination items */}
      <ul className="flex flex-wrap items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded-sm p-3 cursor-pointer  bg-white disabled:opacity-50 hover:bg-blue-500 hover:text-white"
        >
          <IoIosArrowBack size={20} />
        </button>
        {pageNumbers.map((number, index) => (
          <li
            key={index}
            onClick={() => typeof number === "number" && onPageChange(number)}
            className={`rounded py-1.5 px-3 cursor-pointer font-medium hover:bg-blue-500 hover:text-white  ${
              number === currentPage
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-500"
            }`}
            disabled={number === "..."}
          >
            {number}
          </li>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-3 rounded-lg bg-white disabled:opacity-50 hover:bg-blue-500 hover:text-white"
        >
          <IoIosArrowForward size={20} />
        </button>
      </ul>
    </div>
  );
};

export default Pagination;
