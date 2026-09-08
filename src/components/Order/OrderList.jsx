import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";
import { MdCheck, MdKeyboardArrowDown } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  useGetOrdersQuery,
  useUpdateOrderItemStatusMutation,
  useUpdateOrderStatusMutation,
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

const ALL_ORDER_STATUSES = ["All", ...ORDER_STATUSES];

const STATUS_STYLES = {
  Pending: "bg-amber-50 text-amber-700 ring-amber-200",
  Processing: "bg-sky-50 text-sky-700 ring-sky-200",
  Confirm: "bg-blue-50 text-blue-700 ring-blue-200",
  Shipped: "bg-indigo-50 text-indigo-700 ring-indigo-200",
  Delivered: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Cancelled: "bg-red-50 text-red-700 ring-red-200",
  Returned: "bg-orange-50 text-orange-700 ring-orange-200",
  Refunded: "bg-purple-50 text-purple-700 ring-purple-200",
  Failed: "bg-rose-50 text-rose-700 ring-rose-200",
  Completed: "bg-green-50 text-green-700 ring-green-200",
  "Awaiting Payment": "bg-yellow-50 text-yellow-700 ring-yellow-200",
};

const getStatusStyle = (status) =>
  STATUS_STYLES[status] || "bg-gray-50 text-gray-700 ring-gray-200";

const formatOrderDateTime = (value) => {
  if (!value) return { date: "N/A", time: "" };

  const date = new Date(value);

  return {
    date: new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date),
    time: new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }).format(date),
  };
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

const getOrderStatuses = (order) => {
  const statuses = (order.items || [])
    .map((item) => item.status || order.status || "Pending")
    .filter(Boolean);

  return new Set(statuses.length ? statuses : [order.status || "Pending"]);
};

const getInvoiceUrl = (orderId) => `${getApiBaseUrl()}/order/${orderId}/invoice`;

const StatusDropdown = ({
  value,
  disabled,
  isOpen,
  onToggle,
  onClose,
  onChange,
  minWidth = "min-w-[160px]",
}) => {
  const currentStatus = value || "Pending";
  const buttonRef = useRef(null);
  const menuRef = useRef(null);
  const [menuPosition, setMenuPosition] = useState(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const updatePosition = () => {
      const rect = buttonRef.current?.getBoundingClientRect();
      if (!rect) return;

      const gap = 8;
      const spaceBelow = window.innerHeight - rect.bottom - gap;
      const spaceAbove = rect.top - gap;
      const opensUp = spaceBelow < 240 && spaceAbove > spaceBelow;
      const maxHeight = Math.min(280, Math.max(180, opensUp ? spaceAbove : spaceBelow));

      setMenuPosition({
        left: rect.left,
        top: opensUp ? Math.max(gap, rect.top - maxHeight - gap) : rect.bottom + gap,
        width: Math.max(rect.width, 190),
        maxHeight,
      });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleMouseDown = (event) => {
      if (
        buttonRef.current?.contains(event.target) ||
        menuRef.current?.contains(event.target)
      ) {
        return;
      }

      onClose();
    };

    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [isOpen, onClose]);

  return (
    <div className={`relative inline-block ${minWidth}`}>
      <button
        ref={buttonRef}
        type="button"
        disabled={disabled}
        onClick={onToggle}
        className={`flex h-9 w-full items-center justify-between rounded-md border px-2.5 text-left text-sm font-medium shadow-sm ring-1 transition hover:brightness-[0.98] focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60 ${getStatusStyle(
          currentStatus
        )}`}
      >
        <span className="truncate text-xs font-semibold">
          {currentStatus}
        </span>
        <MdKeyboardArrowDown
          className={`ml-2 shrink-0 text-lg opacity-70 transition ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen &&
        menuPosition &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={menuRef}
            className="fixed z-[9999] max-h-[280px] overflow-y-auto rounded-md border border-gray-200 bg-white p-1 shadow-2xl"
            style={{
              left: `${menuPosition.left}px`,
              top: `${menuPosition.top}px`,
              width: `${menuPosition.width}px`,
              maxHeight: `${menuPosition.maxHeight}px`,
            }}
          >
          {ORDER_STATUSES.map((status) => {
            const selected = status === currentStatus;

            return (
              <button
                key={status}
                type="button"
                onClick={() => {
                  onClose();
                  if (!selected) onChange(status);
                }}
                className={`mb-1 flex w-full items-center justify-between rounded px-3 py-2 text-left text-sm font-medium ring-1 transition last:mb-0 hover:brightness-[0.98] ${
                  selected
                    ? `${getStatusStyle(status)} ring-2`
                    : getStatusStyle(status)
                }`}
              >
                <span>{status}</span>
                {selected && <MdCheck className="text-lg" />}
              </button>
            );
          })}
          </div>,
          document.body
        )}
    </div>
  );
};

const OrderList = () => {
  const [expandedOrderIds, setExpandedOrderIds] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [activeStatus, setActiveStatus] = useState("All");
  const [openStatusDropdown, setOpenStatusDropdown] = useState(null);
  const userRole = useSelector((state) => state.auth?.user?.role);
  const orderRole = userRole === "admin" ? "admin" : userRole === "seller" ? "seller" : "user";
  const canUpdateOrderStatus = userRole === "admin";
  const { data, isLoading, isError, error } = useGetOrdersQuery(orderRole);
  const [updateOrderItemStatus, { isLoading: isUpdatingStatus }] =
    useUpdateOrderItemStatusMutation();
  const [updateOrderStatus, { isLoading: isUpdatingOrderStatus }] =
    useUpdateOrderStatusMutation();

  const orders = data?.orders || [];
  const statusCounts = ALL_ORDER_STATUSES.reduce((counts, status) => {
    counts[status] =
      status === "All"
        ? orders.length
        : orders.filter((order) => getOrderStatuses(order).has(status)).length;
    return counts;
  }, {});
  const filteredOrders =
    activeStatus === "All"
      ? orders
      : orders.filter((order) => getOrderStatuses(order).has(activeStatus));
  const totalOrders = filteredOrders.length;
  const totalPages = Math.max(Math.ceil(totalOrders / perPage), 1);
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedOrders = filteredOrders.slice(
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

  const handleOrderStatusChange = async (orderId, status) => {
    try {
      await updateOrderStatus({ orderId, status }).unwrap();
      toast.success("Order status updated");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update order status");
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

  const handleStatusFilter = (status) => {
    setActiveStatus(status);
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
  } else if (!filteredOrders.length) {
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
      const orderDateTime = formatOrderDateTime(order.createdAt);

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
            <td className="px-4 py-3 text-gray-700">
              <span className="block">{orderDateTime.date}</span>
              {orderDateTime.time && (
                <span className="block text-xs text-gray-500">
                  {orderDateTime.time}
                </span>
              )}
            </td>
            <td className="px-4 py-3">
              <p className="font-medium text-gray-800">{getCustomerName(order)}</p>
              <p className="text-xs text-gray-500">{getCustomerContact(order)}</p>
            </td>
            <td className="px-4 py-3">{getOrderQuantity(order)}</td>
            <td className="px-4 py-3 font-semibold">Tk {getOrderItemsTotal(order)}</td>
            <td className="px-4 py-3">
              {canUpdateOrderStatus ? (
                <StatusDropdown
                  disabled={isUpdatingOrderStatus}
                  value={order.status || getOrderStatusSummary(order)}
                  isOpen={openStatusDropdown === `order-${order._id}`}
                  onToggle={() =>
                    setOpenStatusDropdown((current) =>
                      current === `order-${order._id}` ? null : `order-${order._id}`
                    )
                  }
                  onClose={() => setOpenStatusDropdown(null)}
                  onChange={(status) => handleOrderStatusChange(order._id, status)}
                />
              ) : (
                <span className="rounded bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-600">
                  {getOrderStatusSummary(order)}
                </span>
              )}
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
                        <StatusDropdown
                          disabled={isUpdatingStatus}
                          value={item.status || order.status || "Pending"}
                          isOpen={openStatusDropdown === `item-${item._id}`}
                          onToggle={() =>
                            setOpenStatusDropdown((current) =>
                              current === `item-${item._id}` ? null : `item-${item._id}`
                            )
                          }
                          onClose={() => setOpenStatusDropdown(null)}
                          onChange={(status) =>
                            handleStatusChange(order._id, item._id, status)
                          }
                        />
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
      <div className="mb-4 overflow-x-auto border-b border-gray-200">
        <div className="flex min-w-max gap-1">
          {ALL_ORDER_STATUSES.map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => handleStatusFilter(status)}
              className={`group relative flex items-center gap-2 px-4 py-3 text-sm font-medium transition ${
                activeStatus === status
                  ? "text-blue-600"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {status}
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                  activeStatus === status
                    ? "bg-blue-50 text-blue-600"
                    : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                }`}
              >
                {statusCounts[status] || 0}
              </span>
              {activeStatus === status && (
                <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-blue-600" />
              )}
            </button>
          ))}
        </div>
      </div>

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
