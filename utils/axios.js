import axios from "axios";
/* const productionURL = "https://pinwheel-server.vercel.app/api"
const local = "http://localhost:8000/api" */
const baseURL = process.env.NODE_ENV === "production" ? "https://pinwheel-server.vercel.app/api" : "http://localhost:8000/api";

const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true, 
});

export default axiosInstance;
