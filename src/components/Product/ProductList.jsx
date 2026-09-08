import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PriceModal from "./PriceModal";
import StockModal from "./StockModal";
// ✅ RTK QUERY HOOK
import { BiSolidEditAlt } from "react-icons/bi";
import { IoSearchOutline } from "react-icons/io5";
import { getPriceRange } from "../../../utils/getPriceRange";
import {
  useGetAllProductsQuery,
  useUpdatePriceAndStockMutation,
  useUpdateStatusMutation,
} from "../../features/product/productApi";
import Loader from "../Loader";
import Pagination from "../Pagination";

const storefrontBaseUrl = (
  import.meta.env.VITE_STOREFRONT_URL ||
  (import.meta.env.PROD
    ? "https://www.cartout.com.bd"
    : "http://localhost:3000")
).replace(/\/$/, "");

const ProductList = ({ currentPage, setCurrentPage, perPage, setPerPage }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isStockModal, setIsStockModal] = useState(false);
  const userRole = useSelector((state) => state.auth?.user?.role);
  const isAdmin = userRole === "admin";
  const [skuInput, setSkuInput] = useState("");
  const [skuSearch, setSkuSearch] = useState("");
  const queryArg = {
    page: currentPage,
    limit: perPage,
    sku: isAdmin ? skuSearch : "",
  };

  const { data, isLoading, isError, error } = useGetAllProductsQuery(queryArg);


  const [updateStatus] = useUpdateStatusMutation();
  const [updatePriceAndStock] = useUpdatePriceAndStockMutation();
  const products = data?.products || [];
  const totalProducts = data?.totalProducts || 0;


  const closeModal = () => {
    setIsOpenModal(false);
    setSelectedProduct(null);
  };

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
        queryArg, // Pass with mutation for dynamic cache update
      }).unwrap();
      toast.success("Product status updated");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update status");
    }
  };
  const toggleVariantAvailability = async (productId, variant) => {
    try {
      await updatePriceAndStock({
        id: productId,
        variants: [
          {
            _id: variant._id,
            availability: !variant.availability, // ✅ toggle here
          },
        ],
      }).unwrap();

      toast.success("Product availability updated");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update availability");
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePerPageChange = (itemsPerPage) => {
    setPerPage(itemsPerPage);
    setCurrentPage(1);
  };

  const handleSkuSearch = (e) => {
    e.preventDefault();
    setSkuSearch(skuInput.trim());
    setCurrentPage(1);
  };

  const clearSkuSearch = () => {
    setSkuInput("");
    setSkuSearch("");
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
                    <a
                      href={`${storefrontBaseUrl}/product/${product.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-gray-800 hover:text-blue-600 hover:underline"
                      title="View as customer"
                    >
                      {product.productName}
                    </a>

                    <p className="text-xs text-gray-500">SKU: {product.sku}</p>


                  </div>
                </div>
              </td>
              <td className="py-3 px-4">
                {product.variants?.length > 1 ? (
                  (() => {
                    const range = getPriceRange(product);

                    return (
                      <div className="flex items-center gap-1">
                        <p>৳ {range.min} - {range.max}</p>
                        <button
                          onClick={() => {
                            setSelectedProduct(product);
                            setIsOpenModal(true);
                          }} >
                          <BiSolidEditAlt size={20} />
                        </button>
                      </div>
                    );
                  })()
                ) : (
                  // No variants → show single product price UI
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col leading-tight">
                      {product.variants?.[0]?.discountPrice ? (
                        <>
                          {/* Discount price */}
                          <span className="">
                            ৳ {product.variants[0].discountPrice}
                          </span>

                          {/* Regular price (strikethrough) */}
                          <span className="text-gray-400 line-through text-[13px]">
                            ৳ {product.variants[0].price}
                          </span>
                        </>
                      ) : (
                        <span className="font-semibold text-[16px] text-gray-800">
                          ৳ {product.variants[0].price}
                        </span>
                      )}
                    </div>

                    {/* Edit Button */}
                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        setIsOpenModal(true);
                      }}

                    >
                      <BiSolidEditAlt size={20} />
                    </button>
                  </div>

                )}
              </td>

              <td className="py-3 px-4">
                <div className="flex gap-1 items-center">
                  <p>
                    {(() => {
                      const totalStock = product?.variants?.reduce((sum, v) => sum + (v.stock || 0), 0);

                      return totalStock === 0 ? (
                        <span className="text-red-500 font-semibold">Sold Out</span>
                      ) : (
                        <span>{totalStock}</span>
                      );
                    })()}
                  </p>
                  <button
                    onClick={() => {
                      setSelectedProduct(product);
                      setIsStockModal(true);
                    }} >
                    <BiSolidEditAlt size={20} />
                  </button>
                </div>
              </td>
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
            {product.variants.length > 1 && product.variants?.map((variant) => (
              <>
                <tr
                  key={variant._id}
                  className="border-0"
                >

                  <td className="py-2 px-4"></td>
                  <td className="p-3 pl-10 flex gap-3">
                    <img src={product?.images[0]} className="w-10 h-10 rounded object-cover" />

                    <div>
                      <p className="text-gray-800 font-medium">{Object.values(variant.attributes).join(" ")} </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Seller Sku: {variant.sku}
                      </p>
                    </div>
                  </td>
                  {/* <td className="py-2 px-4 pl-16">{variant.name}</td> */}
                  <td className="py-2 px-4">
                    <div className="flex flex-col">
                      {variant.discountPrice ? (
                        <>
                          <span>৳ {variant.discountPrice}</span>
                          <span className="text-gray-400 line-through text-sm">
                            ৳ {variant.price}
                          </span>
                        </>
                      ) : (
                        <span>৳ {variant.price}</span>
                      )}
                    </div>
                  </td>
                  <td className="py-2 px-4">
                    {variant.stock === 0 ? (
                      <span className="text-red-500 font-semibold">Sold Out</span>
                    ) : (
                      variant.stock
                    )}
                  </td>

                  <td className="py-2 px-4"></td>
                  <td className="py-2 px-4">
                    <input
                      type="checkbox"
                      checked={variant.availability}
                      onChange={() =>
                        toggleVariantAvailability(product._id, variant)
                      }
                      className="toggle toggle-success"
                    />
                  </td>
                  <td className="py-2 px-4 text-blue-700"></td>
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
      {isAdmin && (
        <form
          onSubmit={handleSkuSearch}
          className="flex flex-col gap-2 p-2 sm:flex-row sm:items-center"
        >
          <div className="relative w-full sm:max-w-sm">
            <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              value={skuInput}
              onChange={(e) => setSkuInput(e.target.value)}
              placeholder="Search by SKU"
              className="w-full rounded-md border border-gray-300 py-2 pl-9 pr-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Search
            </button>
            {skuSearch && (
              <button
                type="button"
                onClick={clearSkuSearch}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Clear
              </button>
            )}
          </div>
        </form>
      )}
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

    </div>
  );
};

export default ProductList;
