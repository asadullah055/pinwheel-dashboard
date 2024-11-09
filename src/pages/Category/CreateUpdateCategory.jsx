import React, { useState } from "react";
import { BsImage } from "react-icons/bs";

const CreateUpdateCategory = () => {
  const [imageShow, setImage] = useState("");
  const [state, setState] = useState({
    name: "",
    image: "",
  });
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
    setState({
      ...state,
      image: file,
    });
  };
  const handleSubmitOrEdit = (e) => {
    e.preventDefault();
    console.log(state);
  };
  return (
    <div className="w-full md:w-3/4 lg:w-1/2 mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-[24px] font-semibold text-[#111] ">Add Category</h2>
      <form onSubmit={handleSubmitOrEdit} className="pt-1">
        <div className="mb-4">
          <label className="block text-[17px] font-semibold text-[#111] mb-1">
            Category Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Category name"
            value={state.name}
            onChange={(e) => setState({ ...state, name: e.target.value })}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-[17px] font-semibold text-[#111] mb-1">
            Upload Image <span className="text-red-500">*</span>
          </label>

          <div className="flex justify-center">
            <div>
              <label
                className="flex justify-center items-center flex-col h-[200px] w-[250px] cursor-pointer border-2 border-dashed rounded  border-[#d0d2d6]"
                htmlFor="image"
              >
                {imageShow ? (
                  <img className="w-full h-full" src={imageShow} />
                ) : (
                  <>
                    <span>
                      <BsImage />
                    </span>
                    <span>select Image</span>
                  </>
                )}
              </label>
            </div>
            <input
              onChange={handleImageUpload}
              className="hidden"
              type="file"
              name="image"
              id="image"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none "
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default CreateUpdateCategory;
