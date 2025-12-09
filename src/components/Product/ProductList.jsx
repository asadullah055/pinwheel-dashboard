import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import PriceModal from "./PriceModal";
import StockModal from "./StockModal";
// ✅ RTK QUERY HOOK
import { getPriceRange } from "../../../utils/getPriceRange";
import {
  useGetAllProductsQuery,
  useUpdateStatusMutation,
} from "../../features/product/productApi";
import Loader from "../Loader";
import Pagination from "../Pagination";

const ProductList = ({ currentPage, setCurrentPage, perPage, setPerPage }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isStockModal, setIsStockModal] = useState(false);

  const { data, isLoading, isError, error } = useGetAllProductsQuery({
    page: currentPage,
    limit: perPage,
  });
  const [updateStatus] = useUpdateStatusMutation();

  const products = data?.products || [];
  const totalProducts = data?.totalProducts || 0;
  console.log("Products:", products);
  const closeModal = () => {
    setIsOpenModal(false);
    setSelectedProduct(null);
  };
  const priceRange = getPriceRange(products[3]);
  console.log("priceRange", priceRange);


  const closeStockModal = () => {
    setIsStockModal(false);
    setSelectedProduct(null);
  };
  const toggleStatus = async (productId) => {
    const current = products.find((p) => p._id === productId);
    const nextStatus =
      current?.status === "published" ? "unpublished" : "published";

    try {
      await updateStatus({
        id: productId,
        data: { status: nextStatus },
        queryArg: { page: currentPage, limit: perPage }, // Pass with mutation for dynamic cache update
      }).unwrap();
      toast.success("Product status updated");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update status");
    }
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePerPageChange = (itemsPerPage) => {
    setPerPage(itemsPerPage);
    setCurrentPage(1);
  };

  let content = null;

  if (!isLoading && !isError && products.length > 0) {
    content = (
      <tbody>
        {products.map((product) => (
          <React.Fragment >
            {/* Main product row */}
            <tr key={product._id} className="border-0">
              {/* checkbox */}
              <td className="py-3 align-top">
                <div className="flex items-start justify-center">
                  <input type="checkbox" className="checkbox rounded-xs border-gray-600 checkbox-xs" />
                </div>
              </td>
              {/* Product Info */}
              <td className="py-3 flex gap-3">
                <div className="flex  gap-2">
                  <img
                    src={product?.images[0]}
                    alt={product?.productName}
                    className="w-16 h-16 rounded-md object-cover"
                  />
                  <div>
                    <h3
                      className="font-medium text-gray-800"
                    >
                      {product.productName}
                    </h3>

                    <p className="text-xs text-gray-500">SKU-{product.sku}</p>


                  </div>
                </div>
              </td>
              <td className="py-3 px-4">
                ৳{product.discountPrice || product.regularPrice}
              </td>
              <td className="py-3 px-4">{product.stock}</td>
              <td className="py-3 px-4">{product.sales ?? 0}</td>
              <td className="py-3 px-4">
                <input
                  type="checkbox"
                  checked={product.status === "published"}
                  onChange={() => toggleStatus(product._id)}
                  className="toggle toggle-info"
                />
              </td>
              <td className="py-3 px-4 text-blue-700">
                <Link to={`/product/update/${product._id}`}>Edit </Link>
              </td>
            </tr>

            {/* Variants rows */}
            {product.variants?.map((variant) => (
              <>
                <tr
                  key={variant._id}
                  className="border-0"
                >

                  <td className="py-2 px-4"></td>
                  <td className="p-3 pl-10 flex gap-3">
                    <img src={product?.images[0]} className="w-10 h-10 rounded object-cover" />

                    <div>
                      <p className="text-gray-800 font-medium">{variant.name}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Seller Sku: {variant.sku}
                      </p>
                    </div>
                  </td>
                  {/* <td className="py-2 px-4 pl-16">{variant.name}</td> */}
                  <td className="py-2 px-4">
                    ৳{variant.discountPrice}{" "}
                    <span className="text-gray-400 line-through text-xs">
                      ৳{variant.price}
                    </span>
                  </td>
                  <td className="py-2 px-4">{variant.stock}</td>
                  <td className="py-2 px-4"></td>
                  <td className="py-2 px-4">
                    <input
                      type="checkbox"
                      checked={variant.status === "published"}
                      className="toggle toggle-success"
                    />
                  </td>
                  <td className="py-2 px-4 text-blue-700">Edit</td>
                </tr>

              </>
            ))}
            <tr className="border-b !border-gray-300">
              {/* <td colSpan="7" ></td> */}
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    );
  }
  return (
    <div className="relative border rounded-md p-2">
      <table className="table static  border-collapse">
        <thead className="text-[#111] text-[16px] bg-gray-100 rounded-t-md">
          <tr className="rounded">
            <th className="py-3 px-4 w-10 ">
              <input
                type="checkbox"
                className="checkbox rounded-xs border-gray-600 checkbox-xs"
              />
            </th>
            <th className="py-3 px-4 w-1/3">Product Info</th>
            <th className="py-3 px-4">Price</th>
            <th className="py-3 px-4">Stock</th>
            <th className="py-3 px-4">Sales</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4 w-32">Action</th>
          </tr>
        </thead>
        {content}

      </table>
      {/* Loader */}
      {isLoading && (
        <div className="flex items-center justify-center">
          <Loader />
        </div>
      )}
      {/* Error Message */}
      {isError && (
        <div className="text-center py-10">
          <p className="text-red-500">
            {error?.data?.message || "Something went wrong!"}
          </p>
        </div>
      )}
      {/* No Products Found */}
      {!isLoading && !isError && products.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">No products found</p>
        </div>
      )}

      {/* Pagination */}
      {totalProducts > perPage && (
        <Pagination
          currentPage={currentPage}
          totalItems={totalProducts}
          onPageChange={handlePageChange}
          perPage={perPage}
          onPerPageChange={handlePerPageChange}
        />
      )}
      {/* Modal */}
      {isOpenModal && selectedProduct && (
        <PriceModal product={selectedProduct} closeModal={closeModal} />
      )}
      {isStockModal && selectedProduct && (
        <StockModal
          product={selectedProduct}
          closeStockModal={closeStockModal}
        />
      )}
      {/* <ProductTable /> */}
    </div>
  );
};

export default ProductList;
