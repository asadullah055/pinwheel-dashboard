import { getApiBaseUrl } from "../src/utils/apiBaseUrl";

const MAX_IMAGE_WIDTH = 1600;
const MAX_IMAGE_HEIGHT = 1600;
const INITIAL_QUALITY = 0.82;
const MIN_QUALITY = 0.58;
const MAX_UPLOAD_BYTES = 500 * 1024;
const MAX_IMAGE_SIZE_MESSAGE = "Image size must be 500 KB or less.";
const MAX_PRODUCT_IMAGES = 8;

const getImageFileName = (file, extension = "webp") => {
  const baseName = file.name?.replace(/\.[^.]+$/, "") || "product-image";
  return `${baseName}.${extension}`;
};

const canvasToBlob = (canvas, type, quality) =>
  new Promise((resolve) => canvas.toBlob(resolve, type, quality));

const resizeImageFile = async (file) => {
  if (!file.type?.startsWith("image/")) {
    throw new Error(`${file.name || "Selected file"} is not an image`);
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error(MAX_IMAGE_SIZE_MESSAGE);
  }

  const imageBitmap = await createImageBitmap(file);
  const scale = Math.min(
    1,
    MAX_IMAGE_WIDTH / imageBitmap.width,
    MAX_IMAGE_HEIGHT / imageBitmap.height
  );
  const width = Math.max(1, Math.round(imageBitmap.width * scale));
  const height = Math.max(1, Math.round(imageBitmap.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  context.drawImage(imageBitmap, 0, 0, width, height);

  let quality = INITIAL_QUALITY;
  let blob = await canvasToBlob(canvas, "image/webp", quality);

  while (blob && blob.size > MAX_UPLOAD_BYTES && quality > MIN_QUALITY) {
    quality = Math.max(MIN_QUALITY, quality - 0.08);
    blob = await canvasToBlob(canvas, "image/webp", quality);
  }

  imageBitmap.close?.();

  if (!blob) {
    throw new Error(`Could not process ${file.name || "selected image"}`);
  }

  if (blob.size > MAX_UPLOAD_BYTES) {
    throw new Error(MAX_IMAGE_SIZE_MESSAGE);
  }

  return new File([blob], getImageFileName(file), { type: "image/webp" });
};

let uploadSignaturePromise;

const getUploadSignature = async () => {
  if (!uploadSignaturePromise) {
    uploadSignaturePromise = fetch(`${getApiBaseUrl()}/product/image-signature`, {
      method: "POST",
      credentials: "include",
    })
      .then(async (response) => {
        const payload = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(payload?.message || "Could not prepare image upload");
        }

        return payload?.upload;
      })
      .catch((error) => {
        uploadSignaturePromise = undefined;
        throw error;
      });
  }

  return uploadSignaturePromise;
};

const uploadImageToCloudinary = async (file) => {
  const optimizedFile = await resizeImageFile(file);
  const upload = await getUploadSignature();

  if (!upload?.cloudName || !upload?.apiKey || !upload?.signature) {
    throw new Error("Image upload configuration is missing");
  }

  const body = new FormData();
  body.append("file", optimizedFile);
  body.append("api_key", upload.apiKey);
  body.append("timestamp", upload.timestamp);
  body.append("folder", upload.folder);
  body.append("signature", upload.signature);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${upload.cloudName}/image/upload`,
    {
      method: "POST",
      body,
    }
  );
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload?.error?.message || `Failed to upload ${file.name}`);
  }

  return payload.secure_url || payload.url;
};

export const buildProductFormData = async (data, attributes, variants) => {
  const formData = new FormData();
  const productImages = Array.isArray(data.images) ? data.images : [];

  if (productImages.length > MAX_PRODUCT_IMAGES) {
    throw new Error(`A product can have a maximum of ${MAX_PRODUCT_IMAGES} images.`);
  }

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

  const existingImages = [];
  const seenImages = new Set();
  const seenFiles = new Set();
  const addImage = (imageUrl) => {
    if (!imageUrl || seenImages.has(imageUrl)) return;
    seenImages.add(imageUrl);
    existingImages.push(imageUrl);
  };

  for (const img of productImages) {
    if (img instanceof File) {
      const fileKey = `${img.name}-${img.size}-${img.lastModified}`;
      if (seenFiles.has(fileKey)) continue;
      seenFiles.add(fileKey);

      const imageUrl = await uploadImageToCloudinary(img);
      addImage(imageUrl);
    } else if (typeof img === "string") {
      addImage(img);
    }
  }

  if (existingImages.length > MAX_PRODUCT_IMAGES) {
    throw new Error(`A product can have a maximum of ${MAX_PRODUCT_IMAGES} images.`);
  }
  formData.append("existingImages", JSON.stringify(existingImages));

  if (attributes && attributes.length > 0) {
    formData.append("attributes", JSON.stringify(attributes));
  }

  if (variants && variants.length > 0) {
    formData.append("variants", JSON.stringify(variants));
  }

  return formData;
};
