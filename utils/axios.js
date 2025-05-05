import axios from "axios";
/* const productionURL = "https://pinwheel-server.vercel.app/api"
const local = "http://localhost:8000/api" */
const baseURL = process.env.NODE_ENV === "production" ? "https://pinwheel-server.vercel.app/api" : "http://localhost:8000/api";

const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true, 
});
export const setupInterceptors = ({ store, persistor, clearCredentials }) => {
  axiosInstance.interceptors.response.use(
    (res) => res,
    async (err) => {
      const originalRequest = err.config;

      if (
        err.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh") &&
      !originalRequest.url.includes("/auth/login")
      ) {
        originalRequest._retry = true;

        try {
          await axiosInstance.get("/auth/refresh");
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          store.dispatch(clearCredentials());
          await persistor.purge();

          window.location.href = "/seller/login";
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(err);
    }
  );
};

export default axiosInstance;


// export default axiosInstance;
