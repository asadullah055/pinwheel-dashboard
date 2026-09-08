export const getApiErrorMessage = (error, fallback = "Something went wrong") => {
  if (error?.data?.message) return error.data.message;
  if (typeof error?.data === "string") return error.data;
  if (error?.error) return error.error;
  if (error?.message) return error.message;
  return fallback;
};
