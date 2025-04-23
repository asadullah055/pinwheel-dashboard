import axios from "axios";

const productionURL = "https://pinwheel-server.vercel.app/api"
const local = "http://localhost:8000/api"
// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: productionURL,
  withCredentials: true, 
});

export default axiosInstance;
