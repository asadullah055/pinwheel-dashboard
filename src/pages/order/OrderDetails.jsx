import React from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { useGetOrderByIdQuery } from "../../features/order/orderApi";
import { getApiBaseUrl } from "../../utils/apiBaseUrl";

const formatDate = (value) => {
  if (!value) return "N/A";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
};

const formatAddress = (address) => {
  if (!address) return "N/A";

  return [
    address.street,
    address.area,
    address.upazila,
    address.district || address.city,
    address.division || address.state,
    address.country,
  ]
    .filter(Boolean)
    .join(", ");
};

const formatAttributes = (attributes) => {
  if (!attributes) return "";

  return Object.entries(attributes)
    .map(([key, value]) => `${key}: ${value}`)
    .join(", ");
};

const getInvoiceUrl = (orderId) => `${getApiBaseUrl()}/order/${orderId}/invoice`;

const OrderDetails = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const focusedItemId = searchParams.get("item");
  const { data, isLoading, isError, error } = useGetOrderByIdQuery(id, {
    skip: !id,
  });

  if (!id) {
    return (
      <div className="p-4">
        <p className="text-red-500">Order id missing.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4">
        <Link className="mb-4 inline-block text-sm font-medium text-blue-600" to="/order/list">
          Back to orders
        </Link>
        <div className="rounded bg-white p-6 text-center text-red-500">
          {error?.data?.message || "Failed to load order details"}
        </div>
      </div>
    );
  }

  const order = data?.order;
  const customerName = order?.customer?.name || order?.user?.name || "Guest Customer";
  const customerContact =
    order?.customer?.phone || order?.customer?.email || order?.user?.email || "N/A";

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-semibold">
            Order #{order?.orderNumber || order?._id?.slice(-8)}
          </h3>
          <p className="text-sm text-gray-500">{formatDate(order?.createdAt)}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a
            className="rounded bg-orange-50 px-4 py-2 text-sm font-medium text-orange-600"
            href={getInvoiceUrl(order._id)}
            rel="noreferrer"
            target="_blank"
          >
            Invoice
          </a>
          <Link className="rounded bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600" to="/order/list">
            Back
          </Link>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="rounded bg-white p-4">
          <h4 className="mb-3 text-lg font-semibold">Items</h4>
          <div className="space-y-3">
            {order?.items?.map((item) => {
              const product = item.product || {};
              const attributes = formatAttributes(item.attributes);
              const isFocused = focusedItemId === item._id;

              return (
                <div
                  className={`flex gap-3 rounded border p-3 ${
                    isFocused ? "border-blue-300 bg-blue-50" : "border-gray-100"
                  }`}
                  key={item._id}
                >
                  <img
                    alt={product.productName || "Product"}
                    className="h-16 w-16 rounded object-cover"
                    src={product.images?.[0] || "/images/placeholder.png"}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-900">
                      {product.productName || "Product"}
                    </p>
                    {attributes && (
                      <p className="text-xs text-gray-500">{attributes}</p>
                    )}
                    {item.sku && <p className="text-xs text-gray-500">SKU: {item.sku}</p>}
                    <p className="mt-1 text-sm text-gray-700">
                      Qty: {item.quantity} x Tk {item.price}
                    </p>
                    <p className="mt-2 inline-block rounded bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-600">
                      Status: {item.status || order.status || "Pending"}
                    </p>
                  </div>
                  <p className="font-semibold">Tk {Number(item.price || 0) * Number(item.quantity || 0)}</p>
                </div>
              );
            })}
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded bg-white p-4">
            <h4 className="mb-3 text-lg font-semibold">Customer</h4>
            <p className="font-medium text-gray-900">{customerName}</p>
            <p className="text-sm text-gray-600">{customerContact}</p>
          </div>

          <div className="rounded bg-white p-4">
            <h4 className="mb-3 text-lg font-semibold">Delivery Address</h4>
            <p className="text-sm text-gray-700">{formatAddress(order?.shippingAddress)}</p>
          </div>

          <div className="rounded bg-white p-4">
            <h4 className="mb-3 text-lg font-semibold">Payment Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>Tk {order?.totalAmount || 0}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Tk {order?.shippingFee || 0}</span>
              </div>
              <div className="flex justify-between border-t pt-2 font-semibold">
                <span>Total</span>
                <span>Tk {order?.payableAmount || 0}</span>
              </div>
              <p className="text-gray-600">Payment: {order?.paymentMethod}</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default OrderDetails;
