import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'; // Ensure this import is AFTER authSlice is fully defined
import brandslice from '../features/Brand/brandslice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    brand: brandslice, 
  },
});