export const getApiBaseUrl = () =>
  process.env.NODE_ENV === "production"
    ? "https://pinwheel-server.vercel.app/api"
    : "http://localhost:8000/api";
