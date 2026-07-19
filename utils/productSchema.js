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
  shippingInsideDhaka: z
    .string()
    .min(1, "Inside Dhaka shipping charge is required")
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val >= 0, {
      message: "Inside Dhaka shipping charge must be a non-negative number",
    }),
  shippingOutsideDhaka: z
    .string()
    .min(1, "Outside Dhaka shipping charge is required")
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val >= 0, {
      message: "Outside Dhaka shipping charge must be a non-negative number",
    }),
  warrantyType: z.string().min(1, "Warranty type is required"),
  warrantyTime: z.string().optional(),
  warrantyPolicy: z.string().optional(),
  status: z.string().min(1, "Status is required"),
  metaData: z.object({
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
  }),
  description: z.string().min(1, "Description is required"),
  shortDescription: z.string().min(1, "Short description is required"),
  images: z.array(z.any()).min(1, "At least one image is required"),
});
