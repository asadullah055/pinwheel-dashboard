import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashnoard from "./components/Dashboard/Dashnoard";
import MainLayout from "./Layout/MainLayout";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Brand from "./pages/Brand/Brand";
import CreateUpdateBrand from "./pages/Brand/CreateUpdateBrand";
import Category from "./pages/Category/Category";
import CreateUpdateCategory from "./pages/Category/CreateUpdateCategory";
import Order from "./pages/order/Order";
import CreateUpdateProduct from "./pages/product/CreateUpdateProduct";
import Product from "./pages/product/Product";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashnoard />} />
          <Route path="category/create" element={<CreateUpdateCategory />} />
          <Route path="category/list" element={<Category />} />
          <Route path="brand/create" element={<CreateUpdateBrand />} />
          <Route path="brand/list" element={<Brand />} />
          <Route path="order/list" element={<Order />} />
          <Route path="product/list" element={<Product />} />
          <Route path="/product/create" element={<CreateUpdateProduct />} />
        </Route>

        {/* Route without MainLayout */}
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
