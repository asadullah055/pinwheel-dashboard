
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearCredentials: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },

    setCredentials: (state, { payload }) => {
      state.user = payload.user;
      state.isAuthenticated = true;
    },
  },
});

export const { clearCredentials, setCredentials } = authSlice.actions;

export default authSlice.reducer;
