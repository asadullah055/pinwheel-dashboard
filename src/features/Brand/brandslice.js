import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axios";

export const createBrand = createAsyncThunk(
  "/brand/create",
  async (formData, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/brand/create", formData);
      return fulfillWithValue(response.data);
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const getAllBrands = createAsyncThunk(
  "/brand/getAllBrands",
  async ({ page = 1, limit = 10 } = {}, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/brand/getAllBrands?page=${page}&limit=${limit}`);
      console.log(response.data);
      
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const listBrand = createAsyncThunk(
  "/brand/listBrand",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/brand/dropdownBrands`);
     
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  isError: false,
  brand: "",
  AllBrands: [],
  totalBrands: 0,
  listAllBrands: [],
  isLoading: false,
  successMessage: "",
  errorMessage: "",
  error: "",
};
const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBrand.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(createBrand.fulfilled, (state, { payload }) => {
        state.isError = false;
        state.isLoading = false;
        state.brand = payload.brand;
        state.successMessage = payload.message;
      })
      .addCase(createBrand.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.errorMessage = action.payload?.message;
      })
      .addCase(getAllBrands.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(getAllBrands.fulfilled, (state, { payload }) => {
        state.isError = false;
        state.isLoading = false;
        state.totalBrands = payload.totalBrands;
        state.AllBrands = payload.brands;
      })
      .addCase(getAllBrands.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.error = action.payload?.message;
      })
      .addCase(listBrand.fulfilled, (state, { payload }) => {
        state.isError = false;
        state.isLoading = false;
        state.listAllBrands = payload.brands;
      })
  },
});
export const { messageClear } = brandSlice.actions;
export default brandSlice.reducer;
