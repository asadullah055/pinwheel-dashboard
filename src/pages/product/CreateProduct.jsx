import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { buildProductFormData } from "../../../utils/formDataHelper";
import Loading from "../../components/Loading";
import BasicInfo from "../../components/Product/BasicInfo";
import PriceStockVariants from "../../components/Product/PriceStockVariants";
import ProductDescription from "../../components/Product/ProductDescription";
import SEOMeatData from "../../components/Product/SEOMeatData";
import ServiceWarranty from "../../components/Product/ServiceWarranty";
import { useGetAllBrandsQuery } from "../../features/Brand/brandApi";
import { useGetDropdownCategoriesQuery } from "../../features/category/categoryApi";
import { useCreateProductMutation } from "../../features/product/productApi";
const CreateProduct = () => {
  const navigate = useNavigate();
  // 🔹 সব Variant ডাটা এখানে থাকবে
  const [attributes, setAttributes] = useState([]);
  const [variantData, setVariantData] = useState({});
  const [applyAll, setApplyAll] = useState({
    price: "",
    discountPrice: "",
    discountStartDate: "",
    discountEndDate: "",
    stock: "",
    sku: "",
  });
  const [availability, setAvailability] = useState(true);
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const { data: brandData } = useGetAllBrandsQuery();
  const { data: categoryData } = useGetDropdownCategoriesQuery();
  const listCategories = categoryData?.categories || [];
  const listAllBrands = brandData?.brands || [];
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      warrantyType: "no warranty",
      shippingInsideDhaka: "80",
      shippingOutsideDhaka: "120",
      seoTitle: "",
      seoContent: "",
    },
  });
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const onSubmit = async (data) => {
    // Variants handle
    const variants = Object.entries(variantData).map(([key, variant]) => {
      if (key === "single") {
        return {
          sku: variant.sku || "",
          price: variant.price || "",
          discountPrice: variant.discountPrice || "",
          discountStartDate: variant.discountStartDate || "",
          discountEndDate: variant.discountEndDate || "",
          stock: variant.stock || "",
          availability: variant.availability !== false,
        };
      } else {
        const attributeValues = variant._originalValues || key.split("|");
        const variantObj = {
          sku: variant.sku || "",
          price: variant.price || "",
          discountPrice: variant.discountPrice || "",
          discountStartDate: variant.discountStartDate || "",
          discountEndDate: variant.discountEndDate || "",
          stock: variant.stock || "",
          availability: variant.availability !== false,
        };

        // add attribute values dynamically
        attributes.forEach((attr, index) => {
          if (attributeValues[index]) {
            variantObj[attr.name] = attributeValues[index];
          }
        });

        return variantObj;
      }
    });


    const formData = buildProductFormData(data, attributes, variants);

    try {
      const res = await createProduct(formData).unwrap();
      toast.success(res?.message || "Product created successfully");
      navigate("/product/list");

    } catch (err) {
      toast.error(err?.data?.message || "Something went wrong");
    }

  };

  return (
    <div className="w-full lg:w-3/4 ms-4 p-6 rounded-lg">
      <h2 className="text-xl lg:text-4xl font-semibold text-[#111] mb-4">
        Add Product
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <BasicInfo control={control} errors={errors} listCategories={listCategories} listAllBrands={listAllBrands} />

        <ProductDescription
          control={control}
          errors={errors}
          description={description}
          shortDescription={shortDescription}
          setDescription={setDescription}
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
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white px-6 py-2 rounded">
          {isLoading ? <Loading text={"Submitting...."} /> : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
