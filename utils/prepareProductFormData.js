export const prepareProductFormData = (
  formData,
  description,
  shortDescription,
  images
) => {
  const formDataToSend = new FormData();

  formDataToSend.append("title", formData.title);
  formDataToSend.append("description", description);
  formDataToSend.append("shortDescription", shortDescription);
  formDataToSend.append("regularPrice", formData.regularPrice);
  formDataToSend.append("stock", formData.stock);
  formDataToSend.append("category", formData.category);
  formDataToSend.append("brand", formData.brand);
  formDataToSend.append("discountPrice", formData.discountPrice);
  formDataToSend.append("metaTitle", formData.metaData.metaTitle);
  formDataToSend.append("metaDescription", formData.metaData.metaDescription);
  formDataToSend.append("packageHeight", formData.packageHeight);
  formDataToSend.append("packageWeight", formData.packageWeight);
  formDataToSend.append("packageWidth", formData.packageWidth);
  formDataToSend.append("packageLength", formData.packageLength);
  formDataToSend.append("warrantyPolicy", formData.warrantyPolicy);
  formDataToSend.append("warrantyTime", formData.warrantyTime);
  formDataToSend.append("warrantyType", formData.warrantyType);
  formDataToSend.append("status", formData.status);

  if (images && images.length > 0) {
    images.forEach((image) => {
      formDataToSend.append("images", image);
    });
  }

  return formDataToSend;
};
