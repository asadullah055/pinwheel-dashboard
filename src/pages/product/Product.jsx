import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductList from "../../components/Product/ProductList";
import { getAllProducts } from "../../features/product/productSlice";

const Product = () => {
  const dispatch = useDispatch();
  const { isError, isLoading, totalProducts, allProduct, product } =
    useSelector((state) => state.product);
  // const [brands, setBrand] = useState([AllBrands]);

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    dispatch(getAllProducts({ page: currentPage, limit: perPage }));
  }, [dispatch, currentPage, perPage, product]);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-2xl">Product List</h3>
          <p className="text-sm py-1">Manage your Product</p>
        </div>
      </div>
      <div className="bg-white p-2 rounded-md">
        <div className="overflow-x-auto">
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
            <div className="text-red-500 text-center h-96 flex items-center justify-center">
              Error loading Products
            </div>
          ) : allProduct.length === 0 ? (
            <div className="flex justify-center items-center h-96">
              <p className="text-gray-500">No Product available</p>
            </div>
          ) : (
            <ProductList
              allProduct={allProduct}
              setPerPage={setPerPage}
              totalProducts={totalProducts}
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

export default Product;
