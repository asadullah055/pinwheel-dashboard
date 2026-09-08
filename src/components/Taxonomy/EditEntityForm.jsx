import { useEffect, useState } from "react";
import { BsImage } from "react-icons/bs";
import Loading from "../Loading";

const EditEntityForm = ({
  entityLabel,
  entity,
  isLoading,
  loadError,
  isSaving,
  onSubmit,
  onCancel,
}) => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("active");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (!entity) return;
    setName(entity.name || "");
    setStatus(entity.status || "active");
    setImagePreview(entity.image || "");
  }, [entity]);

  useEffect(() => {
    if (!imageFile) return undefined;

    const previewUrl = URL.createObjectURL(imageFile);
    setImagePreview(previewUrl);
    return () => URL.revokeObjectURL(previewUrl);
  }, [imageFile]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ name: name.trim(), status, imageFile });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <Loading text={`Loading ${entityLabel.toLowerCase()}...`} />
      </div>
    );
  }

  if (loadError || !entity) {
    return (
      <div className="mx-auto w-full max-w-xl rounded-lg bg-white p-6 text-center shadow-md">
        <p className="text-red-500">{loadError || `${entityLabel} not found`}</p>
        <button
          type="button"
          onClick={onCancel}
          className="mt-4 rounded-md bg-gray-200 px-5 py-2 font-medium text-gray-700"
        >
          Back to list
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-xl rounded-lg bg-white p-6 shadow-md">
      <h2 className="text-[24px] font-semibold text-[#111]">Edit {entityLabel}</h2>
      <form className="pt-3" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor={`${entityLabel}-name`} className="mb-1 block text-[17px] font-semibold text-[#111]">
            {entityLabel} Name <span className="text-red-500">*</span>
          </label>
          <input
            id={`${entityLabel}-name`}
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-xs focus:border-blue-500 focus:outline-none"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor={`${entityLabel}-status`} className="mb-1 block text-[17px] font-semibold text-[#111]">
            Status
          </label>
          <select
            id={`${entityLabel}-status`}
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-xs focus:border-blue-500 focus:outline-none"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="mb-1 block text-[17px] font-semibold text-[#111]">
            Replace Image <span className="text-sm font-normal text-gray-500">(optional)</span>
          </label>
          <div className="flex justify-center">
            <label
              htmlFor={`${entityLabel}-image`}
              className="flex h-[200px] w-[250px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-sm border-2 border-dashed border-[#d0d2d6]"
            >
              {imagePreview ? (
                <img className="h-full w-full object-cover" src={imagePreview} alt={`${entityLabel} preview`} />
              ) : (
                <>
                  <BsImage className="text-3xl" />
                  <span className="mt-2">Select image</span>
                </>
              )}
            </label>
            <input
              id={`${entityLabel}-image`}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => setImageFile(event.target.files?.[0] || null)}
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="w-1/3 rounded-md bg-gray-200 px-4 py-2 font-medium text-gray-700 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving || !name.trim()}
            className="w-2/3 rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? <Loading text="Updating..." /> : `Update ${entityLabel}`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEntityForm;
