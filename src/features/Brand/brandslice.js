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
const initialState = {
  isError: false,
  brand: "",
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
      });
  },
});
export const { messageClear } = brandSlice.actions;
export default brandSlice.reducer;
