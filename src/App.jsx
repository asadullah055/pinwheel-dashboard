import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import Brand from "./components/Brand/Brand";
import Category from "./components/Category/Category";
import Dashnoard from "./components/Dashboard/Dashnoard";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashnoard />} />
          <Route path="category/create" element={<Category />} />
          <Route path="brand/create" element={<Brand />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
