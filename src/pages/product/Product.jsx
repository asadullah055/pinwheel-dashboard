import React from "react";
import ProductList from "../../components/Product/ProductList";

const Product = () => {
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
          <ProductList />
        </div>
      </div>
    </div>
  );
};

export default Product;
