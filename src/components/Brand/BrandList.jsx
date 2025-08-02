import { useGetAllBrandsQuery } from "../../features/Brand/brandApi";
import Loader from "../Loader";
import Pagination from "../Pagination";
import SingleBrand from "./SingleBrand";

const BrandList = ({ currentPage, setCurrentPage, perPage, setPerPage }) => {
  const { data, isLoading, isError, error } = useGetAllBrandsQuery({
    page: currentPage,
    limit: perPage,
  });
  const brands = data?.brands || [];
  const totalBrands = data?.totalBrands || 0;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePerPageChange = (itemsPerPage) => {
    setPerPage(itemsPerPage);
    setCurrentPage(1); // Reset to page 1 when perPage changes
  };
  return (
    <>
      <table className="table static">
        <thead className="text-[#111] text-[16px]">
          <tr>
            <th scope="col" className="py-3 px-4 w-10 ">
              <input
                type="checkbox"
                className="checkbox  rounded-xs border-gray-600 checkbox-xs"
              />
            </th>
            <th scope="col" className="py-3 px-4">
              Name
            </th>
            <th scope="col" className="py-3 px-4">
              Image
            </th>
            <th scope="col" className="py-3 px-4">
              Quantity
            </th>
            <th scope="col" className="py-3 px-4">
              Sale
            </th>
            <th scope="col" className="py-3 px-4">
              Status
            </th>
            <th scope="col" className="py-3 px-4">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {!isLoading &&
            !isError &&
            brands.length > 0 &&
            brands.map((brand) => (
              <SingleBrand key={brand._id} brand={brand} />
            ))}
        </tbody>
      </table>
      {isLoading && (
        <div className="flex items-center justify-center">
          <Loader />
        </div>
      )}
      {/* Error Message */}
      {isError && (
        <div className="text-center py-10">
          <p className="text-red-500">
            {error?.data?.message || "Something went wrong!"}
          </p>
        </div>
      )}
      {/* No Brands Found */}
      {!isLoading && !isError && brands.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">No Brands found</p>
        </div>
      )}
      {totalBrands > perPage && (
        <Pagination
          currentPage={currentPage}
          totalItems={totalBrands}
          onPageChange={handlePageChange}
          perPage={perPage}
          onPerPageChange={handlePerPageChange}
        />
      )}
    </>
  );
};

export default BrandList;
