import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../../../utils/axios";

axios.defaults.withCredentials = true;

export const login = createAsyncThunk(
  "/auth/login",
  async (formData, { fulfillWithValue, rejectWithValue }) => {
    try {
      const user = await axiosInstance.post("/auth/login", formData);
      localStorage.setItem("accessToken", user.data.token);
      return fulfillWithValue(user.data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const initialState = {
  isError: false,
  user: "",
  userInfo: "",
  isLoading: false,
  successMessage: "",
  errorMessage: "",
  error: "",
  token: localStorage.getItem("accessToken") || "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        console.log(payload);

        state.isError = false;
        state.isLoading = false;
        state.seller = payload.sellerWithoutPassword;
        state.token = payload.token;
        state.successMessage = payload.message;
      })
      .addCase(login.rejected, (state, action) => {
        console.log(action.payload);
        state.isError = true;
        state.isLoading = false;
        state.errorMessage = action.payload?.message;
      });
  },
});

export const { messageClear } = authSlice.actions;
export default authSlice.reducer; // Make sure the reducer is exported
