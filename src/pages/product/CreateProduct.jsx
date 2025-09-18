import { useState } from "react";
import { useForm } from "react-hook-form";
import BasicInfo from "../../components/Product/BasicInfo";
import PriceStockVariants from "../../components/Product/PriceStockVariants";
import SEOMeatData from "../../components/Product/SEOMeatData";
import ServiceWarranty from "../../components/Product/ServiceWarranty";
import { useGetAllBrandsQuery } from "../../features/Brand/brandApi";
import { useGetDropdownCategoriesQuery } from "../../features/category/categoryApi";
import DescriptionSection from './../../components/Product/DescriptionSection';
const CreateProduct = () => {
  // 🔹 সব Variant ডাটা এখানে থাকবে
  const [attributes, setAttributes] = useState([]);
  const [variantData, setVariantData] = useState({});
  const [applyAll, setApplyAll] = useState({ price: "", discountPrice: "", stock: "", sku: "" });
  const [availability, setAvailability] = useState(true);
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const { data: brandData } = useGetAllBrandsQuery();
  const { data: categoryData } = useGetDropdownCategoriesQuery();
  const listCategories = categoryData?.categories || [];
  const listAllBrands = brandData?.brands || [];
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      productName: "",
      category: "",
      brand: "",
      images: [],
    },
  });

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      description,
      shortDescription,
      attributes,
      variantData,
      applyAll,
      availability,
    };

    console.log("✅ Final Payload:", payload);
    // এখন সবকিছু console-এ দেখা যাবে 🎉
  };

  return (
    <div className="w-full lg:w-3/4 ms-4 p-6 rounded-lg">
      <h2 className="text-xl lg:text-4xl font-semibold text-[#111] mb-4">
        Add Product
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <BasicInfo control={control} errors={errors} listCategories={listCategories} listAllBrands={listAllBrands} />
        <DescriptionSection
          description={description}
          setDescription={setDescription}
          shortDescription={shortDescription}
          setShortDescription={setShortDescription}
        />
        <PriceStockVariants
          attributes={attributes}
          setAttributes={setAttributes}
          variantData={variantData}
          setVariantData={setVariantData}
          applyAll={applyAll}
          setApplyAll={setApplyAll}
          availability={availability}
          setAvailability={setAvailability}
        />
        <ServiceWarranty control={control} errors={errors} />
        <SEOMeatData control={control} errors={errors} />
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">Create Product</button>
      </form>
    </div>
  );
};

export default CreateProduct;