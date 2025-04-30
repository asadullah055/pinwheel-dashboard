import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axios";

export const createProduct = createAsyncThunk(
  "/product/create",
  async (formData, { fulfillWithValue, rejectWithValue }) => {

   
    try {
      const response = await axiosInstance.post("/product/create", formData);
      return fulfillWithValue(response.data);
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const getAllProducts = createAsyncThunk(
  "/product/getAllProducts",
  async ({ page = 1, limit = 10 } = {}, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/product/getAllProducts?page=${page}&limit=${limit}`);
      console.log(response.data);
      
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
/* export const listproduct = createAsyncThunk(
  "/product/listproduct",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/product/dropdownproducts`);
     
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
); */

const initialState = {
  isError: false,
  product: "",
  allProduct: [],
  totalProducts: 0,
//   listAllproducts: [],
  isLoading: false,
  successMessage: "",
  errorMessage: "",
  error: "",
};
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, { payload }) => {
        state.isError = false;
        state.isLoading = false;
        state.product = payload.product;
        state.successMessage = payload.message;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.errorMessage = action.payload?.message;
      })
      .addCase(getAllProducts.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, { payload }) => {
        state.isError = false;
        state.isLoading = false;
        state.allProduct = payload.products;
        state.totalProducts = payload.totalProducts;
        state.successMessage = payload.message;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.errorMessage = action.payload?.message;
      })

  },
});
export const { messageClear } = productSlice.actions;
export default productSlice.reducer;
