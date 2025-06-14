import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// 👇 RTK Query APIs
import { authApi } from '../features/auth/authApi';
import { productApi } from '../features/product/productApi';

// 👇 Redux slices
import { apiSlice } from '../features/api/apiSlice';
import authReducer from '../features/auth/authSlice';
import brandReducer from '../features/Brand/brandslice';
import categoryReducer from '../features/category/categorySlice';
import productReducer from '../features/product/productSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], 
  blacklist: [
    authApi.reducerPath,
    productApi.reducerPath,
  ],
};

// 👇 Combine reducers including RTK Query reducers
const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  brand: brandReducer,
  category: categoryReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

// 👇 Wrap with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 👇 Create store with middleware
const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(apiSlice.middleware)
});

export const persistor = persistStore(store);
export default store;