import React, { useState } from "react";
import { BiSolidEditAlt } from "react-icons/bi";
import PriceModal from "./PriceModal";
import StockModal from "./StockModal";

const ProductList = ({ allProduct, totalProducts }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isStockModal, setIsStockModal] = useState(false);
  // const [isPriceModal, setIsPriceModal] = useState(false);
  const closeModal = () => setIsOpenModal(false);
  const closeStockModal = () => setIsStockModal(false);
  const [products, setProducts] = useState(allProduct);

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
                      <span>৳ {product.discountPrice} </span>
                      <span
                        className="cursor-pointer"
                        onClick={() => setIsOpenModal(true)}
                      >
                        <BiSolidEditAlt size={18} />
                      </span>
                    </div>
                    <span className="text-gray-400 line-through">
                      ৳ {product.regularPrice}{" "}
                    </span>
                  </div>
                </td>

                <td className="py-3 px-4">
                  <div className="flex items-center gap-1">
                    {product.stock}
                    <span
                      className="cursor-pointer"
                      onClick={() => setIsStockModal(true)}
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
                    onChange={() => {}}
                    className="toggle toggle-info"
                  />
                </td>

                <td className="py-3 px-4 w-32">
                  <button className="text-blue-700 cursor-pointer">Edit</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Modal */}
      {isOpenModal && <PriceModal closeModal={closeModal} />}
      {isStockModal && <StockModal closeStockModal={closeStockModal} />}
    </div>
  );
};

export default ProductList;
