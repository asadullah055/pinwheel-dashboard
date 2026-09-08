import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import EditEntityForm from "../../components/Taxonomy/EditEntityForm";
import {
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
} from "../../features/category/categoryApi";

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetCategoryByIdQuery(id);
  const [updateCategory, { isLoading: isSaving }] = useUpdateCategoryMutation();

  const handleSubmit = async ({ name, status, imageFile }) => {
    if (!name) {
      toast.error("Category name is required");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("status", status);
    if (imageFile) formData.append("image", imageFile);

    try {
      const response = await updateCategory({ id, formData }).unwrap();
      toast.success(response?.message || "Category updated successfully");
      navigate("/category/list");
    } catch (requestError) {
      toast.error(requestError?.data?.message || "Failed to update category");
    }
  };

  return (
    <EditEntityForm
      entityLabel="Category"
      entity={data?.category}
      isLoading={isLoading}
      loadError={isError ? error?.data?.message || "Failed to load category" : ""}
      isSaving={isSaving}
      onSubmit={handleSubmit}
      onCancel={() => navigate("/category/list")}
    />
  );
};

export default EditCategory;
