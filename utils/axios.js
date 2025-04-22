import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true, // Include credentials (cookies) in requests
});

export default axiosInstance;
