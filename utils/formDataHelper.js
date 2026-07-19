export const buildProductFormData = (data,attributes, variants) => {
  const formData = new FormData();

  // ✅ Basic Fields
  formData.append("productName", data.productName);
  formData.append("category", data.category);
  formData.append("brand", data.brand);
  formData.append("description", data.description || "");
  formData.append("shortDescription", data.shortDescription || "");
  formData.append("warrantyType", data.warrantyType || "");
  formData.append("warrantyTime", data.warrantyTime || "");
  formData.append("warrantyPolicy", data.warrantyPolicy || "");
  formData.append("shippingInsideDhaka", data.shippingInsideDhaka ?? "80");
  formData.append("shippingOutsideDhaka", data.shippingOutsideDhaka ?? "120");
  formData.append("seoTitle", data.seoTitle || "");
  formData.append("seoContent", data.seoContent || "");

  // ✅ Images (multiple)
  if (data.images && data.images.length > 0) {
    data.images.forEach((img) => {
      if (img instanceof File) {
        formData.append("images", img);
      } else {
        formData.append("existingImages", JSON.stringify(img));
      }
    });
  }
if (attributes && attributes.length > 0) {
    formData.append("attributes", JSON.stringify(attributes));
  }

  // 🔹 Variants (array/object হলে stringify করতে হবে)
  if (variants && variants.length > 0) {
    formData.append("variants", JSON.stringify(variants));
  }
  // ✅ Attributes
  /* if (data.attributes && data.attributes.length > 0) {
    formData.append("attributes", JSON.stringify(data.attributes));
  }

  // ✅ Variants
  if (data.variants && data.variants.length > 0) {
    formData.append("variants", JSON.stringify(data.variants));
  }
 */
  return formData;
};
