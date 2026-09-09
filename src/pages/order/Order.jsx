import React from "react";
import OrderList from "../../components/Order/OrderList";

const Order = () => {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-2xl">Order List</h3>
          <p className="text-sm py-1">Manage your Order</p>
        </div>
      </div>
      <div className="bg-white p-2 rounded-md">
        <OrderList />
      </div>
    </div>
  );
};

export default Order;
