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
import CreateUpdateProduct from "./pages/product/CreateUpdateProduct";
import Product from "./pages/product/Product";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Protected routes under MainLayout */}
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
          <Route path="product/list" element={<Product />} />
          <Route path="product/create" element={<CreateUpdateProduct />} />
          // category
          <Route path="category/create" element={<CreateCategory />} />
          <Route path="category/list" element={<Category />} />
        </Route>

        {/* Public routes without protection */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/sign-up" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
