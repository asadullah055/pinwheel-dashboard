import axios from "axios";
const URL = process.env.NODE_ENV === "development" ? "http://localhost:8000/api" : "https://pinwheel-server.vercel.app/";
// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: URL, // Base URL for the API
  withCredentials: true, // Include credentials (cookies) in requests
});

export default axiosInstance;
