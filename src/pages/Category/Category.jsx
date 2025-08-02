import { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import CategoryList from "../../components/Category/CategoryList";

const Category = () => {
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-2xl">Category List</h3>
          <p className="text-sm py-1">Manage your categories</p>
        </div>
        <Link
          to="/category/create"
          className="border py-2 px-3 bg-[#3577f0] text-white rounded-md font-semibold flex items-center gap-1"
        >
          <IoIosAddCircleOutline className="text-xl" /> Add Category
        </Link>
      </div>

      <div className="bg-white p-2 rounded-md">
        <div className="overflow-x-auto">
          <CategoryList
            currentPage={currentPage}
            perPage={perPage}
            setCurrentPage={setCurrentPage}
            setPerPage={setPerPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Category;
