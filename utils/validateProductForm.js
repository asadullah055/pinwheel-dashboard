export const validateProductForm = (formData, description, shortDescription, images) => {
    const newErrors = {};
  
    if (!formData.title.trim()) newErrors.title = "Product title is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.brand) newErrors.brand = "Brand is required";
    if (!formData.regularPrice) newErrors.regularPrice = "Regular price is required";
    if (!formData.stock) newErrors.stock = "Stock is required";
    if (!formData.packageWeight) newErrors.packageWeight = "Package weight is required";
    if (!formData.packageLength) newErrors.packageLength = "Package length is required";
    if (!formData.packageWidth) newErrors.packageWidth = "Package width is required";
    if (!formData.packageHeight) newErrors.packageHeight = "Package height is required";
    if (!formData.warrantyType) newErrors.warrantyType = "Warranty type is required";
    if (!formData.status) newErrors.status = "Status is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!shortDescription.trim()) newErrors.shortDescription = "Short description is required";
    if (!formData.metaData.metaTitle.trim()) newErrors.metaTitle = "Meta title is required";
    if (!formData.metaData.metaDescription.trim()) newErrors.metaDescription = "Meta description is required";
    if (!images.length) newErrors.images = "At least one image is required";
  
    return newErrors;
  };
  