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
import Coupon from "./pages/coupon/Coupon";
import Customer from "./pages/customers/Customer";
import CreateOrder from "./pages/order/CreateOrder";
import Order from "./pages/order/Order";
import OrderDetails from "./pages/order/OrderDetails";
import CreateProduct from "./pages/product/CreateProduct";
import Product from "./pages/product/Product";
import UpdateProduct from "./pages/product/UpdateProduct";
import User from "./pages/User/User";

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
          <Route path="product/update/:id" element={<UpdateProduct />} />
          <Route path="product/list" element={<Product />} />
          // order
          <Route path="order/create" element={<CreateOrder />} />
          <Route path="order/details" element={<OrderDetails />} />
          <Route path="coupon" element={<Coupon />} />
          <Route path="customer" element={<Customer />} />
          <Route path="user" element={<User />} />
        </Route>

        {/* Public routes without protection */}
        <Route path="/seller/login" element={<Login />} />
        <Route path="/seller/sign-up" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
