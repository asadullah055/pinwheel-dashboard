import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'; // Ensure this import is AFTER authSlice is fully defined
import brandReducer from '../features/Brand/brandslice';
import categoryReducer from '../features/category/categorySlice';
import productReducer from '../features/product/productSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    brand: brandReducer,
    category: categoryReducer, 
    product: productReducer, // Uncomment this line when productSlice is defined
  },
});