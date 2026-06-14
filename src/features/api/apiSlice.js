import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { clearCredentials } from "../auth/authSlice";
import { getApiBaseUrl } from "../../utils/apiBaseUrl";

const baseQuery = fetchBaseQuery({
  baseUrl: getApiBaseUrl(),
  credentials: "include",
});
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Try refreshing the token
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);
    if (refreshResult.data) {
      // Try original request again
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Refresh failed, logout
      api.dispatch(clearCredentials());
      window.location.href = "/seller/login";
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Category", "Product", "Brand", "Banner", "Order"],
  endpoints: (builder) => ({}),
});
