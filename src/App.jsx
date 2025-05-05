import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./Layout/MainLayout";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Brand from "./pages/Brand/Brand";
import CreateBrand from "./pages/Brand/CreateBrand";
import Category from "./pages/Category/Category";
import CreateCategory from "./pages/Category/CreateCategory";
import Order from "./pages/order/Order";
import CreateProduct from "./pages/product/CreateProduct";
import Product from "./pages/product/Product";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="brand/create" element={<CreateBrand />} />
          <Route path="brand/list" element={<Brand />} />
          <Route path="order/list" element={<Order />} />
          // category
          <Route path="category/create" element={<CreateCategory />} />
          <Route path="category/list" element={<Category />} />
          // product
          <Route path="product/create" element={<CreateProduct />} />
          <Route path="product/list" element={<Product />} />
        </Route>

        {/* Public routes without protection */}
        <Route path="/seller/login" element={<Login />} />
        <Route path="/seller/sign-up" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
