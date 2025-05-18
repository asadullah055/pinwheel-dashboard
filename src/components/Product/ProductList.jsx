import React, { useState } from "react";
import toast from "react-hot-toast";
import { BiSolidEditAlt } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { updateStatus } from "../../features/product/productSlice";
import PriceModal from "./PriceModal";
import StockModal from "./StockModal";

const ProductList = ({ allProduct }) => {
  const [products, setProducts] = useState(allProduct);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isStockModal, setIsStockModal] = useState(false);
  const dispatch = useDispatch();
  const closeModal = () => {
    setIsOpenModal(false);
    setSelectedProduct(null);
  };

  const closeStockModal = () => {
    setIsStockModal(false);
    setSelectedProduct(null);
  };

  const toggleStatus = async (productId) => {
    try {
      await dispatch(
        updateStatus({
          id: productId,
          data: {
            status:
              products.find((prod) => prod._id === productId).status ===
              "published"
                ? "unpublished"
                : "published",
          },
        })
      ).unwrap();
      toast.success("Product status updated successfully");
    } catch (error) {
      toast.error("Something went wrong, please try again.");
    }

    setProducts((prev) =>
      prev.map((prod) =>
        prod._id === productId
          ? {
              ...prod,
              status: prod.status === "published" ? "unpublished" : "published",
            }
          : prod
      )
    );
  };

  return (
    <div className="relative">
      <table className="table static">
        <thead className="text-[#111] text-[16px]">
          <tr>
            <th className="py-3 px-4 w-10 ">
              <input
                type="checkbox"
                className="checkbox rounded-xs border-gray-600 checkbox-xs"
              />
            </th>
            <th className="py-3 px-4 w-1/3">Product</th>
            <th className="py-3 px-4">Price</th>
            <th className="py-3 px-4">Stock</th>
            <th className="py-3 px-4">Sales</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4 w-32">Action</th>
          </tr>
        </thead>

        <tbody>
          {products?.length > 0 &&
            products.map((product) => (
              <tr key={product._id} className="text-[14px] text-[#111]">
                <td className="py-3 px-4 w-10">
                  <input
                    type="checkbox"
                    className="checkbox rounded-xs border-gray-600 checkbox-xs"
                  />
                </td>
                <td className="py-3 px-4 w-1/3">
                  <div className="flex items-center gap-2">
                    <img
                      src={product?.images[0]}
                      alt={product?.title}
                      className="w-16 h-16 rounded-md"
                    />
                    <div className="flex flex-col">
                      <h3 className="text-sm font-semibold leading-5 text-gray-700 line-clamp-2">
                        {product?.title}
                      </h3>
                      <p className="text-xs text-gray-500">SKU-{product.sku}</p>
                    </div>
                  </div>
                </td>

                <td className="py-3 px-4">
                  <div className="flex justify-center flex-col gap-1">
                    <div className="flex items-center gap-1">
                      {product.discountPrice === 0 ? (
                        product.regularPrice
                      ) : (
                        <span>৳ {product.discountPrice} </span>
                      )}
                      <span
                        className="cursor-pointer"
                        onClick={() => {
                          setSelectedProduct(product);
                          setIsOpenModal(true);
                        }}
                      >
                        <BiSolidEditAlt size={18} />
                      </span>
                    </div>
                    {product.discountPrice !== 0 && (
                      <span className="text-gray-400 line-through">
                        ৳ {product.regularPrice}{" "}
                      </span>
                    )}
                  </div>
                </td>

                <td className="py-3 px-4">
                  <div className="flex items-center gap-1">
                    {product.stock}
                    <span
                      className="cursor-pointer"
                      onClick={() => {
                        setSelectedProduct(product);
                        setIsStockModal(true);
                      }}
                    >
                      <BiSolidEditAlt size={18} />
                    </span>
                  </div>
                </td>

                <td className="py-3 px-4">20</td>

                <td className="py-3 px-4">
                  <input
                    type="checkbox"
                    checked={product.status === "published"}
                    onChange={() => toggleStatus(product._id)}
                    className="toggle toggle-info"
                  />
                </td>

                <td className="py-3 px-4 w-32">
                  <Link
                    to={`/product/update/${product._id}`}
                    className="text-blue-700 cursor-pointer"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

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

export default React.memo(ProductList);
