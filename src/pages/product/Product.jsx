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
      <div className="bg-white rounded-md">
        <div className="overflow-x-auto">
          <ProductList
            currentPage={currentPage}
            perPage={perPage}
            setCurrentPage={setCurrentPage}
            setPerPage={setPerPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Product;
