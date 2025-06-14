import { useState } from "react";
import toast from "react-hot-toast";
import { BsImage } from "react-icons/bs";
import Loading from "../../components/Loading";
import { useCreateCategoryMutation } from "../../features/category/categoryApi";  

const CreateCategory = () => {
  const [imageShow, setImageShow] = useState("");
  const [state, setState] = useState({
    name: "",
    image: "",
  });

  // 👉 RTK Query Hook
  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  // Handle Image Upload/Preview
  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageShow(URL.createObjectURL(file));
      setState((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!state.name || !state.image) {
      toast.error("Please fill in all fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", state.name);
    formData.append("image", state.image);

    try {
      const res = await createCategory(formData).unwrap();
      toast.success(res?.message || "Category created successfully");

      // Optional: Reset form
      setState({ name: "", image: "" });
      setImageShow("");
    } catch (err) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="w-full md:w-3/4 lg:w-1/2 mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-[24px] font-semibold text-[#111] ">Add Category</h2>
      <form className="pt-1" onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-4">
          <label className="block text-[17px] font-semibold text-[#111] mb-1">
            Category Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Category name"
            value={state.name}
            onChange={(e) => setState({ ...state, name: e.target.value })}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-xs focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label className="block text-[17px] font-semibold text-[#111] mb-1">
            Upload Image <span className="text-red-500">*</span>
          </label>
          <div className="flex justify-center">
            <label
              htmlFor="image"
              className="flex justify-center items-center flex-col h-[200px] w-[250px] cursor-pointer border-2 border-dashed rounded-sm border-[#d0d2d6]"
            >
              {imageShow ? (
                <img
                  className="w-full h-full object-cover"
                  src={imageShow}
                  alt="Preview"
                />
              ) : (
                <>
                  <BsImage className="text-4xl" />
                  <span>Select Image</span>
                </>
              )}
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none"
        >
          {isLoading ? <Loading text={"Submitting..."} /> : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default CreateCategory;
