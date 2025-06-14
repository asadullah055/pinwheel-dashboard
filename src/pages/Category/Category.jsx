import { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import CategoryList from "../../components/Category/CategoryList";
import { useGetAllCategoriesQuery } from "../../features/category/categoryApi";

const Category = () => {
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  // RTK Query hook
  const { data, isLoading, isError, error } = useGetAllCategoriesQuery({
    page: currentPage,
    limit: perPage,
  });

  const allCategory = data?.categories || [];
  const totalCategory = data?.totalCategories || 0;

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
          {isLoading ? (
            <div className="flex justify-center items-center h-96">
              <svg
                className="animate-spin h-10 w-10 text-blue-500"
                viewBox="3 3 18 18"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  d="M12 3v2a7.001 7.001 0 0 1 0 14v2a9.001 9.001 0 0 0 0-18z"
                />
              </svg>
            </div>
          ) : isError ? (
            <div className="text-red-500 text-center h-96 flex items-center justify-center">
              {error?.data?.message || "Error loading categories"}
            </div>
          ) : allCategory.length === 0 ? (
            <div className="flex justify-center items-center h-96">
              <p className="text-gray-500">No categories available</p>
            </div>
          ) : (
            <CategoryList
              allCategory={allCategory}
              setPerPage={setPerPage}
              totalCategory={totalCategory}
              currentPage={currentPage}
              perPage={perPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;
