import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(2, "Product name is required"),
  category: z.string().min(1, "Category is required"),
  brand: z.string().min(1, "Brand is required"),
  regularPrice: z
    .string()
    .min(1, "Price is required")
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), {
      message: "Price must be a number",
    }),
  discountPrice: z
    .string()
    .optional()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), {
      message: "Discount Price must be a number",
    }),
  stock: z
    .string()
    .min(1, "Stock is required")
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), {
      message: "Stock must be a number",
    }),
  packageWeight: z.string().min(1, "Package weight is required"),
  packageLength: z.string().min(1, "Package length is required"),
  packageWidth: z.string().min(1, "Package width is required"),
  packageHeight: z.string().min(1, "Package height is required"),
  warrantyType: z.string().min(1, "Warranty type is required"),
  warrantyTime: z.string().optional(),
  warrantyPolicy: z.string().optional(),
  status: z.string().min(1, "Status is required"),
  metaData: z.object({
    metaTitle: z.string().min(1, "Meta title is required"),
    metaDescription: z.string().min(1, "Meta description is required"),
  }),
  description: z.string().min(1, "Description is required"),
  shortDescription: z.string().min(1, "Short description is required"),
  images: z.array(z.any()).min(1, "At least one image is required"),
});
