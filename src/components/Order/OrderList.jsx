import React from "react";

const OrderList = () => {
  return (
    <table className="table static">
      <thead className="text-[#111] text-[16px]">
        <tr>
          <th scope="col" className="py-3 px-4 w-10 ">
            {/*  <input
              type="checkbox"
              className="checkbox-warning  checkbox checkbox-md rounded-xs border-gray-400"
            /> */}
            <input
              type="checkbox"
              className="checkbox checkbox-warning rounded-xs border-gray-400 checkbox-xs"
            />
          </th>
          <th scope="col" className="py-3 px-4">
            Order ID
          </th>
          <th scope="col" className="py-3 px-4">
            Order Date
          </th>
          <th scope="col" className="py-3 px-4">
            Customer info
          </th>
          <th scope="col" className="py-3 px-4">
            Quantity
          </th>
          <th scope="col" className="py-3 px-4">
            Total amount
          </th>
          <th scope="col" className="py-3 px-4">
            Order Status
          </th>
          <th scope="col" className="py-3 px-4">
            Action
          </th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  );
};

export default OrderList;
