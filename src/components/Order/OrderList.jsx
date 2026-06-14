import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  useGetOrdersQuery,
  useUpdateOrderItemStatusMutation,
} from "../../features/order/orderApi";
import { getApiBaseUrl } from "../../utils/apiBaseUrl";
import Loader from "../Loader";
import Pagination from "../Pagination";

const ORDER_STATUSES = [
  "Pending",
  "Processing",
  "Confirm",
  "Shipped",
  "Delivered",
  "Cancelled",
  "Returned",
  "Refunded",
  "Failed",
  "Completed",
  "Awaiting Payment",
];

const formatDate = (value) => {
  if (!value) return "N/A";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
};

const getCustomerName = (order) =>
  order?.customer?.name || order?.user?.name || "Guest Customer";

const getCustomerContact = (order) =>
  order?.customer?.phone || order?.customer?.email || order?.user?.email || "N/A";

const getOrderQuantity = (order) =>
  order.items?.reduce((total, item) => total + Number(item.quantity || 0), 0) || 0;

const getOrderItemsTotal = (order) =>
  order.items?.reduce(
    (total, item) => total + Number(item.price || 0) * Number(item.quantity || 0),
    0
  ) || 0;

const getOrderStatusSummary = (order) => {
  const statuses = new Set(
    (order.items || []).map((item) => item.status || order.status || "Pending")
  );

  if (statuses.size === 1) {
    return [...statuses][0];
  }

  return `${statuses.size} product statuses`;
};

const getInvoiceUrl = (orderId) => `${getApiBaseUrl()}/order/${orderId}/invoice`;

const OrderList = () => {
  const [expandedOrderIds, setExpandedOrderIds] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const userRole = useSelector((state) => state.auth?.user?.role);
  const orderRole = userRole === "admin" ? "admin" : userRole === "seller" ? "seller" : "user";
  const { data, isLoading, isError, error } = useGetOrdersQuery(orderRole);
  const [updateOrderItemStatus, { isLoading: isUpdatingStatus }] =
    useUpdateOrderItemStatusMutation();

  const orders = data?.orders || [];
  const totalOrders = orders.length;
  const totalPages = Math.max(Math.ceil(totalOrders / perPage), 1);
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedOrders = orders.slice(
    (safeCurrentPage - 1) * perPage,
    safeCurrentPage * perPage
  );

  const toggleExpandedOrder = (orderId) => {
    setExpandedOrderIds((current) => ({
      ...current,
      [orderId]: !current[orderId],
    }));
  };

  const handleStatusChange = async (orderId, itemId, status) => {
    try {
      await updateOrderItemStatus({ orderId, itemId, status }).unwrap();
      toast.success("Product status updated");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update product status");
    }
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handlePerPageChange = (itemsPerPage) => {
    setPerPage(itemsPerPage);
    setCurrentPage(1);
  };

  let content = null;

  if (isLoading) {
    content = (
      <tr>
        <td className="py-8 text-center" colSpan={8}>
          <Loader />
        </td>
      </tr>
    );
  } else if (isError) {
    content = (
      <tr>
        <td className="py-8 text-center text-red-500" colSpan={8}>
          {error?.data?.message || "Failed to load orders"}
        </td>
      </tr>
    );
  } else if (!orders.length) {
    content = (
      <tr>
        <td className="py-8 text-center text-gray-500" colSpan={8}>
          No orders found.
        </td>
      </tr>
    );
  } else {
    content = paginatedOrders.map((order) => {
      const isExpanded = Boolean(expandedOrderIds[order._id]);
      const items = order.items || [];

      return (
        <React.Fragment key={order._id}>
          <tr className="border-b border-gray-100 align-top">
            <td className="px-4 py-3">
              <input
                type="checkbox"
                className="checkbox checkbox-warning rounded-xs border-gray-400 checkbox-xs"
              />
            </td>
            <td className="px-4 py-3 font-medium text-gray-800">
              <span>{order.orderNumber || order._id?.slice(-8)}</span>
              <p className="mt-1 text-xs font-normal text-gray-500">
                {items.length} product{items.length > 1 ? "s" : ""}
              </p>
            </td>
            <td className="px-4 py-3 text-gray-700">{formatDate(order.createdAt)}</td>
            <td className="px-4 py-3">
              <p className="font-medium text-gray-800">{getCustomerName(order)}</p>
              <p className="text-xs text-gray-500">{getCustomerContact(order)}</p>
            </td>
            <td className="px-4 py-3">{getOrderQuantity(order)}</td>
            <td className="px-4 py-3 font-semibold">Tk {getOrderItemsTotal(order)}</td>
            <td className="px-4 py-3">
              <span className="rounded bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-600">
                {getOrderStatusSummary(order)}
              </span>
            </td>
            <td className="px-4 py-3">
              <div className="flex flex-wrap gap-2">
                {items.length > 1 ? (
                  <button
                    className="rounded bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600"
                    type="button"
                    onClick={() => toggleExpandedOrder(order._id)}
                  >
                    {isExpanded ? "Hide" : "View"}
                  </button>
                ) : (
                  <Link
                    to={`/order/details/${order._id}?item=${items[0]?._id || ""}`}
                    className="rounded bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600"
                  >
                    Details
                  </Link>
                )}
                <a
                  className="rounded bg-orange-50 px-3 py-1 text-sm font-medium text-orange-600"
                  href={getInvoiceUrl(order._id)}
                  rel="noreferrer"
                  target="_blank"
                >
                  Invoice
                </a>
              </div>
            </td>
          </tr>

          {isExpanded && (
            <tr className="bg-gray-50">
              <td colSpan={8} className="px-4 py-4">
                <div className="space-y-3">
                  {items.map((item) => {
                    const product = item.product || {};
                    const itemTotal =
                      Number(item.price || 0) * Number(item.quantity || 0);

                    return (
                      <div
                        className="grid gap-3 rounded bg-white p-3 shadow-sm md:grid-cols-[56px_1fr_120px_160px_96px]"
                        key={item._id}
                      >
                        <img
                          alt={product.productName || "Product"}
                          className="h-14 w-14 rounded object-cover"
                          src={product.images?.[0] || "/images/placeholder.png"}
                        />
                        <div className="min-w-0">
                          <p className="font-medium text-gray-900">
                            {product.productName || "Product"}
                          </p>
                          {item.sku && (
                            <p className="text-xs text-gray-500">Seller SKU: {item.sku}</p>
                          )}
                          <p className="text-xs text-gray-500">
                            Qty {item.quantity} x Tk {item.price}
                          </p>
                        </div>
                        <p className="font-semibold text-gray-800">Tk {itemTotal}</p>
                        <select
                          className="h-9 rounded border border-gray-300 px-2 text-sm outline-none"
                          disabled={isUpdatingStatus}
                          value={item.status || order.status || "Pending"}
                          onChange={(event) =>
                            handleStatusChange(order._id, item._id, event.target.value)
                          }
                        >
                          {ORDER_STATUSES.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                        <div className="flex items-center justify-start md:justify-end">
                          <div className="flex flex-wrap gap-2">
                            <Link
                              to={`/order/details/${order._id}?item=${item._id}`}
                              className="rounded bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600"
                            >
                              Details
                            </Link>
                            <a
                              className="rounded bg-orange-50 px-3 py-1 text-sm font-medium text-orange-600"
                              href={getInvoiceUrl(order._id)}
                              rel="noreferrer"
                              target="_blank"
                            >
                              Invoice
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </td>
            </tr>
          )}
        </React.Fragment>
      );
    });
  }

  return (
    <>
      <table className="table static">
        <thead className="text-[#111] text-[16px]">
          <tr>
            <th scope="col" className="py-3 px-4 w-10 ">
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
              Product Status
            </th>
            <th scope="col" className="py-3 px-4">
              Action
            </th>
          </tr>
        </thead>
        <tbody>{content}</tbody>
      </table>

      {!isLoading && !isError && totalOrders > perPage && (
        <Pagination
          currentPage={safeCurrentPage}
          totalItems={totalOrders}
          onPageChange={handlePageChange}
          perPage={perPage}
          onPerPageChange={handlePerPageChange}
        />
      )}
    </>
  );
};

export default OrderList;
