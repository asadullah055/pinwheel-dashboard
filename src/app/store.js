import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from 'redux-persist/lib/storage';
// import authReducer from "../features/auth/authSlice"; // Import the reducer
import authReducer from "../features/auth/authSlice";
import brandReducer from "../features/Brand/brandslice";
import categoryReducer from "../features/category/categorySlice";
import productReducer from "../features/product/productSlice";


const rootReducer = combineReducers({
  auth: authReducer,
  brand: brandReducer,
  category: categoryReducer,
  product: productReducer,
});
const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;