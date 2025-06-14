import { useState } from "react";
import ProductList from "../../components/Product/ProductList";

const Product = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-2xl">Product List</h3>
          <p className="text-sm text-gray-500">Manage your products</p>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white p-2 rounded-md">
        <div className="overflow-x-auto">
          {/* {isLoading ? (
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
            <div className="text-red-500 text-center h-96 flex items-center justify-center">
              {error?.data?.message || "Error loading products"}
            </div>
          ) : allProduct.length === 0 ? (
            <div className="flex justify-center items-center h-96">
              <p className="text-gray-500">No product available</p>
            </div>
          ) : ( */}
          <ProductList
            currentPage={currentPage}
            perPage={perPage}
            setCurrentPage={setCurrentPage}
            setPerPage={setPerPage}
          />
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default Product;
