import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axios";

export const createCategory = createAsyncThunk(
  "/category/create",
  async (formData, { fulfillWithValue, rejectWithValue }) => {
       try {
      const response = await axiosInstance.post("/category/create", formData);
         return fulfillWithValue(response.data);
    } catch (error) {
        console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
const initialState = {
  isError: false,
  category: "",
  isLoading: false,
  successMessage: "",
  errorMessage: "",
  error: "",
};
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCategory.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(createCategory.fulfilled, (state, { payload }) => {
        state.isError = false;
        state.isLoading = false;
        state.category = payload.category;
        state.successMessage = payload.message;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.errorMessage = action.payload?.message;
      });
  },
});
export const { messageClear } = categorySlice.actions;
export default categorySlice.reducer;
