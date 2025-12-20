import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
// Helpers / Components
import { buildProductFormData } from "../../../utils/formDataHelper";
import Loading from "../../components/Loading";
import BasicInfo from "../../components/Product/BasicInfo";
import PriceStockVariants from "../../components/Product/PriceStockVariants";
import ProductDescription from "../../components/Product/ProductDescription";
import SEOMeatData from "../../components/Product/SEOMeatData";
import ServiceWarranty from "../../components/Product/ServiceWarranty";

// API Hooks
import { useGetAllBrandsQuery } from "../../features/Brand/brandApi";
import { useGetDropdownCategoriesQuery } from "../../features/category/categoryApi";
import {
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from "../../features/product/productApi";

export default function UpdateProduct() {
  // STATES

  const { id } = useParams();
  const productId = id;

  const [attributes, setAttributes] = useState([]);
  const [variantData, setVariantData] = useState({});
  const [applyAll, setApplyAll] = useState({
    price: "",
    discountPrice: "",
    stock: "",
    sku: "",
  });
  const [availability, setAvailability] = useState(true);
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");

  // API Queries
  const { data: brandData } = useGetAllBrandsQuery();
  const { data: categoryData } = useGetDropdownCategoriesQuery();
  const { data: singleProductData, isLoading: loadingProduct } =
    useGetSingleProductQuery(productId);



  const listCategories = categoryData?.categories || [];
  const listAllBrands = brandData?.brands || [];

  const [updateProduct, { isLoading: updating }] = useUpdateProductMutation();


  // React Hook Form
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});

  // 🔹 WHEN PRODUCT DATA ARRIVES → PREFILL FORM + STATE
  // 🔹 WHEN PRODUCT DATA ARRIVES → PREFILL FORM + STATE
  // 🔹 WHEN PRODUCT DATA ARRIVES → PREFILL FORM + STATE
  // 🔹 WHEN PRODUCT DATA ARRIVES → PREFILL FORM + STATE
  // 🔹 WHEN PRODUCT DATA ARRIVES → PREFILL FORM + STATE
  // 🔹 WHEN PRODUCT DATA ARRIVES → PREFILL FORM + STATE
  useEffect(() => {
    if (!singleProductData?.product) return;

    const p = singleProductData.product;

    // Prefill basic form fields
    reset({
      productName: p.productName,
      brand: p.brand._id,
      category: p.category._id,
      regularPrice: p.price,
      discountPrice: p.discountPrice,
      warranty: p.warranty,
      warrantyType: p.warrantyType,
      warrantyTime: p.warrantyTime,
      warrantyPolicy: p.warrantyPolicy,
      seoTitle: p.seoTitle,
      seoContent: p.seoContent,
      weight: p.weight,
      length: p.length,
      width: p.width,
      height: p.height,
      description: p.description,
      shortDescription: p.shortDescription,
      images: p.images,
    });

    // Description
    setDescription(p.description || "");
    setShortDescription(p.shortDescription || "");



    const normalizedAttributes = (p.attributes || []).map(attr => {

      return {
        ...attr,
        values: attr.values, // Keep original case for display
        normalizedValues: attr.values.map(val => val.toLowerCase()) // Lowercase for keys
      };
    });

    setAttributes(normalizedAttributes);

    const productAttrs = p.attributes || [];
    const tempVariantData = {};


    p.variants.forEach((v, index) => {
      let key = "single";

      if (productAttrs.length > 0) {
        key = productAttrs
          .map(attr => {
            // 🔥 FIX: Variant এ attributes object আছে যেখানে keys lowercase
            let attrValue = "";

            if (v.attributes) {
              // Try lowercase version of attribute name
              const lowercaseAttrName = attr.name.toLowerCase();
              attrValue = v.attributes[lowercaseAttrName] || v.attributes[attr.name] || "";
            } else {
              // Fallback: try direct property
              attrValue = v[attr.name] || v[attr.name.toLowerCase()] || "";
            }

            // Normalize the value to lowercase for consistent key generation
            return (attrValue || "").toLowerCase();
          })
          .join("|");
      }

      tempVariantData[key] = {
        sku: v.sku,
        price: v.price,
        discountPrice: v.discountPrice,
        stock: v.stock,
        availability: v.availability !== false
      };
    });

    setVariantData(tempVariantData);
  }, [singleProductData]);


  // SUBMIT HANDLER
  const onSubmit = async (data) => {
    const variants = Object.entries(variantData).map(([key, variant]) => {
      if (key === "single") {
        return {
          sku: variant.sku,
          price: variant.price,
          discountPrice: variant.discountPrice,
          stock: variant.stock,
          availability: variant.availability !== false,
        };
      } else {
        // Split the lowercase key
        const lowercaseValues = key.split("|");

        const variantObj = {
          sku: variant.sku,
          price: variant.price,
          discountPrice: variant.discountPrice,
          stock: variant.stock,
          availability: variant.availability !== false,
        };

        // 🔥 FIX: Map lowercase values back to original case from attributes
        attributes.forEach((attr, index) => {
          if (lowercaseValues[index]) {
            // Find the original case value from attribute.values
            const originalValue = attr.values.find(
              val => val.toLowerCase() === lowercaseValues[index]
            );

            // Use original case value for database
            variantObj[attr.name] = originalValue || lowercaseValues[index];
          }
        });

        return variantObj;
      }
    });


    const formData = buildProductFormData(
      data,
      attributes,
      variants,
      description,
      shortDescription
    );
    formData.append("productId", productId);

    try {
      const res = await updateProduct({ id: productId, data: formData }).unwrap();
      toast.success(res?.message || "Product updated successfully");
    } catch (err) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  if (loadingProduct) return <Loading text="Loading product..." />;

  return (
    <div className="w-full lg:w-3/4 ms-4 p-6 rounded-lg">
      <h2 className="text-xl lg:text-4xl font-semibold text-[#111] mb-4">
        Update Product
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <BasicInfo
          control={control}
          errors={errors}
          listCategories={listCategories}
          listAllBrands={listAllBrands}
        />

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
          disabled={updating}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          {updating ? <Loading text={"Updating..."} /> : "Update Product"}
        </button>
      </form>
    </div>
  );
}
