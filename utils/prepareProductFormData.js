export const prepareProductFormData = (
  formData,
  description,
  shortDescription,
  images
) => {
  const formDataToSend = new FormData();

  // Add all basic fields
  Object.entries(formData).forEach(([key, value]) => {
    if (key === "metaData") {
      formDataToSend.append("metaTitle", value.metaTitle || "");
      formDataToSend.append("metaDescription", value.metaDescription || "");
    } else {
      formDataToSend.append(key, value);
    }
  });

  // Add description and shortDescription
  formDataToSend.append("description", description);
  formDataToSend.append("shortDescription", shortDescription);

  if (images && images.length > 0) {
    images.forEach((image) => {
      formDataToSend.append("images", image);
    });
  }

  return formDataToSend;
};
