import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import EditEntityForm from "../../components/Taxonomy/EditEntityForm";
import {
  useGetBrandByIdQuery,
  useUpdateBrandMutation,
} from "../../features/Brand/brandApi";

const EditBrand = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetBrandByIdQuery(id);
  const [updateBrand, { isLoading: isSaving }] = useUpdateBrandMutation();

  const handleSubmit = async ({ name, status, imageFile }) => {
    if (!name) {
      toast.error("Brand name is required");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("status", status);
    if (imageFile) formData.append("image", imageFile);

    try {
      const response = await updateBrand({ id, formData }).unwrap();
      toast.success(response?.message || "Brand updated successfully");
      navigate("/brand/list");
    } catch (requestError) {
      toast.error(requestError?.data?.message || "Failed to update brand");
    }
  };

  return (
    <EditEntityForm
      entityLabel="Brand"
      entity={data?.brand}
      isLoading={isLoading}
      loadError={isError ? error?.data?.message || "Failed to load brand" : ""}
      isSaving={isSaving}
      onSubmit={handleSubmit}
      onCancel={() => navigate("/brand/list")}
    />
  );
};

export default EditBrand;
