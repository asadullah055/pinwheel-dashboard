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
  async (
    { page = 1, limit = 10 } = {},
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get(
        `/product/getAllProducts?page=${page}&limit=${limit}`
      );
      console.log(response.data);

      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const updateProduct = createAsyncThunk(
  "/product/updateProduct",
  async ({ id, data }, { fulfillWithValue, rejectWithValue }) => {
    console.log(id, data);

    try {
      const response = await axiosInstance.put(`/product/${id}`, data);
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const updatePriceAndStock = createAsyncThunk(
  "/product/updatePrice",
  async (data, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/product/updatePrice`, data);
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const getSingleProduct = createAsyncThunk(
  "/product/singleProduct",
  async (id, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/product/${id}`);

      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const updateStatus = createAsyncThunk(
  "/product/updateStatus",
  async ({ id, data }, { fulfillWithValue, rejectWithValue }) => {
    console.log(id, data);

    try {
      const response = await axiosInstance.put(
        `/product/updateStatus/${id}`,
        data
      );
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
  // updatePriceAndStock: {},
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
      .addCase(updatePriceAndStock.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(updatePriceAndStock.fulfilled, (state, { payload }) => {
        state.isError = false;
        state.isLoading = false;
        state.product = payload.product;
        state.successMessage = payload.message;
      })
      .addCase(updatePriceAndStock.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.errorMessage = action.payload?.message;
      })
      .addCase(getSingleProduct.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(getSingleProduct.fulfilled, (state, { payload }) => {
        state.isError = false;
        state.isLoading = false;
        state.product = payload.product;
        state.successMessage = payload.message;
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.errorMessage = action.payload?.message;
      })
      .addCase(updateProduct.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, { payload }) => {
        state.isError = false;
        state.isLoading = false;
        state.product = payload.product;
        state.successMessage = payload.message;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.errorMessage = action.payload?.message;
      });
  },
});
export const { messageClear } = productSlice.actions;
export default productSlice.reducer;
