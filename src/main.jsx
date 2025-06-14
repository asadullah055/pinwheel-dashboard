import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
// import { setupInterceptors } from "../utils/axios.js";
import App from "./App.jsx";
import store, { persistor } from "./app/store.js"; // Import the configured store
// import { clearCredentials } from "./features/auth/authSlice";
import "./index.css";
// setupInterceptors({ store, persistor, logout });
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);
