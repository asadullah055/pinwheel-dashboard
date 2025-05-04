import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axios";

export const login = createAsyncThunk(
  "/auth/login",
  async (formData, { fulfillWithValue, rejectWithValue }) => {
    try {
      const user = await axiosInstance.post("/auth/login", formData);
      return fulfillWithValue(user.data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const logout = createAsyncThunk(
  "/auth/logout",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/logout");
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const initialState = {
  isError: false,
  user: "",
  userInfo: "",
  isAuthenticated: false,
  isLoading: false,
  successMessage: "",
  errorMessage: "",
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    clearCredentials: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isError = false;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.user = payload.user;
        state.successMessage = payload.message;
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.errorMessage = action.payload?.message;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = payload?.message || "Logout failed";
      });
  },
});

export const { messageClear, clearCredentials } = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
