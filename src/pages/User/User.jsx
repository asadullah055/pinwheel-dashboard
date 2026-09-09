import { FiCalendar, FiMail, FiMapPin, FiPhone, FiSearch } from "react-icons/fi";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useGetSellersQuery } from "../../features/seller/sellerApi";

const formatDate = (value) => {
  if (!value) return "N/A";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
};

const getInitials = (seller) => {
  const name = seller?.shopName || seller?.name || "Seller";
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
};

const User = () => {
  const userRole = useSelector((state) => state.auth.user?.role);
  const { data, isLoading, isError, error } = useGetSellersQuery(undefined, {
    skip: userRole !== "admin",
  });

  const sellers = data?.sellers || [];

  if (!userRole) {
    return (
      <div className="flex min-h-64 items-center justify-center rounded border border-gray-200 bg-white">
        <Loader />
      </div>
    );
  }

  if (userRole !== "admin") {
    return (
      <section className="rounded border border-red-100 bg-red-50 p-6 text-red-700">
        <h1 className="text-xl font-semibold">Access denied</h1>
        <p className="mt-2 text-sm">Only admin can view the seller list.</p>
      </section>
    );
  }

  return (
    <section className="space-y-5">
      <div className="flex flex-col gap-3 border-b border-gray-200 pb-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Seller List</h1>
          <p className="mt-1 text-sm text-gray-500">
            {isLoading ? "Loading registered sellers..." : `${sellers.length} registered seller${sellers.length === 1 ? "" : "s"}`}
          </p>
        </div>
        <div className="flex items-center gap-2 rounded border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500">
          <FiSearch className="text-gray-400" />
          <span>All registered sellers</span>
        </div>
      </div>

      {isLoading ? (
        <div className="flex min-h-64 items-center justify-center rounded border border-gray-200 bg-white">
          <Loader />
        </div>
      ) : isError ? (
        <div className="rounded border border-red-100 bg-red-50 p-5 text-sm text-red-700">
          {error?.data?.message || "Failed to load sellers."}
        </div>
      ) : sellers.length === 0 ? (
        <div className="rounded border border-gray-200 bg-white p-8 text-center">
          <h2 className="text-lg font-semibold text-gray-900">No sellers found</h2>
          <p className="mt-2 text-sm text-gray-500">
            Registered sellers will appear here.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded border border-gray-200 bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-5 py-3">Seller</th>
                  <th className="px-5 py-3">Contact</th>
                  <th className="px-5 py-3">Shop</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Registered</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sellers.map((seller) => (
                  <tr key={seller._id} className="hover:bg-gray-50">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {seller.shopLogo ? (
                          <img
                            src={seller.shopLogo}
                            alt={seller.shopName || seller.name}
                            className="h-11 w-11 rounded border border-gray-200 object-cover"
                          />
                        ) : (
                          <div className="grid h-11 w-11 place-items-center rounded bg-gray-100 text-sm font-semibold text-gray-700">
                            {getInitials(seller)}
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-gray-900">
                            {seller.name || "N/A"}
                          </p>
                          <p className="text-xs text-gray-500">
                            ID: {seller.sellerId || "N/A"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-gray-700">
                      <p className="flex items-center gap-2">
                        <FiMail className="text-gray-400" />
                        {seller.email || "N/A"}
                      </p>
                      <p className="mt-1 flex items-center gap-2">
                        <FiPhone className="text-gray-400" />
                        {seller.mobileNumber || "N/A"}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-gray-700">
                      <p className="font-medium text-gray-900">
                        {seller.shopName || "N/A"}
                      </p>
                      <p className="mt-1 flex max-w-xs items-start gap-2 text-xs text-gray-500">
                        <FiMapPin className="mt-0.5 flex-none text-gray-400" />
                        <span>{seller.shopLocation || "N/A"}</span>
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-col gap-2">
                        <span
                          className={`w-fit rounded px-2 py-1 text-xs font-semibold ${
                            seller.isVerified
                              ? "bg-green-50 text-green-700"
                              : "bg-yellow-50 text-yellow-700"
                          }`}
                        >
                          {seller.isVerified ? "Verified" : "Unverified"}
                        </span>
                        {seller.holidayMode ? (
                          <span className="w-fit rounded bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700">
                            Holiday mode
                          </span>
                        ) : null}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-gray-700">
                      <p className="flex items-center gap-2">
                        <FiCalendar className="text-gray-400" />
                        {formatDate(seller.createdAt)}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
};

export default User;
