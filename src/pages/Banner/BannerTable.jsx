import toast from "react-hot-toast";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { RiFilterLine } from "react-icons/ri";
import { formatCustomDate } from "../../../utils/customsDate";
import Loader from "../../components/Loader";
import { useDeleteBannerMutation, useGetAllBannersQuery, useToggleBannerStatusMutation } from "../../features/banner/bannerApi";

const BannerTable = () => {
    // Example banner data
    const { data, isLoading, isError, error } = useGetAllBannersQuery({
        page: 1,
        limit: 10,
        bannerType: "main",
    });


    const banners = data?.banners || []
    const [toggleBannerStatus] = useToggleBannerStatusMutation();
    const [deleteBanner] = useDeleteBannerMutation();
    const handleToggleStatus = async (bannerId, currentStatus) => {
        try {
            // Optimistic update happens automatically with RTK Query
            await toggleBannerStatus(bannerId).unwrap();
            toast.success(`Banner ${!currentStatus ? 'activated' : 'deactivated'} successfully`);
        } catch (error) {
            toast.error(error?.data?.message || "Failed to update banner status");
        }
    };

    // Handle delete
    const handleDelete = async (bannerId) => {
        if (window.confirm("Are you sure you want to delete this banner?")) {
            try {
                await deleteBanner(bannerId).unwrap();
                toast.success("Banner deleted successfully");
            } catch (error) {
                toast.error(error?.data?.message || "Failed to delete banner");
            }
        }
    };

    return (
        <div className="bg-white rounded-lg shadow p-5">
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg">Banner table <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-sm">{banners.length}</span></h2>
                <div className="flex space-x-3">
                    <select className="border rounded px-3 py-2 text-sm w-48 focus:outline-none focus:ring-1 focus:ring-gray-300">
                        <option value="all">All</option>
                        <option value="footer">Footer</option>
                        <option value="popup">Popup</option>
                    </select>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded flex gap-2 items-center"> <RiFilterLine size={20} className="font-bold" />  Filter</button>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center space-x-1 gap-2">
                        <FaPlus /> Add Banner
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700">
                            <th className="p-3">SL</th>
                            <th className="p-3">Image</th>
                            <th className="p-3">Banner Type</th>
                            <th className="p-3">Start Date</th>
                            <th className="p-3">End Date</th>
                            <th className="p-3">Priority</th>
                            <th className="p-3">Active</th>
                            <th className="p-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!isLoading &&
                            !isError &&
                            banners.length > 0 && banners.map((banner, index) => (
                                <tr key={banner._id} className="border-b hover:bg-gray-50 align-middle">
                                    <td className="p-3">{index + 1}</td>
                                    <td className="p-3">
                                        <img src={banner?.bannerURL} alt={banner?.bannerType} className="h-14 rounded-md" />
                                    </td>
                                    <td className="p-3 capitalize">{banner.bannerType}</td>
                                    <td className="p-3">{formatCustomDate(banner.startDate)}</td>
                                    <td className="p-3">{banner.endDate ? formatCustomDate(banner.endDate) : "Infinity"}</td>
                                    <td className="p-3">{banner.priority}</td>
                                    <td className="p-3">
                                        <button
                                            onClick={() => handleToggleStatus(banner._id, banner.isActive)}
                                            className={`w-10 h-6 flex items-center rounded-full transition ${banner.isActive ? "bg-blue-600" : "bg-gray-300"
                                                }`}
                                        >
                                            <div
                                                className={`bg-white w-5 h-5 rounded-full shadow-md transform transition ${banner.isActive ? "translate-x-5" : "translate-x-1"
                                                    }`}
                                            ></div>
                                        </button>
                                    </td>
                                    <td className="p-3">
                                        <button className="text-blue-600 border border-blue-500 p-2 rounded hover:bg-blue-50 mr-3">
                                            <FaEdit />
                                        </button>
                                        <button onClick={() => handleDelete(banner._id)} className="text-red-600 border border-red-500 p-2 rounded hover:bg-red-50">
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
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
                {/* No Banners Found */}
                {!isLoading && !isError && banners.length === 0 && (
                    <div className="text-center py-10">
                        <p className="text-gray-500">No Banner found</p>
                    </div>
                )}
            </div>
            <div className="">
                {/* <Pagination /> */}
            </div>
        </div>
    );
};

export default BannerTable;