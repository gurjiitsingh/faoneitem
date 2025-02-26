import { z } from "zod";

export type categoryType = {
  id:string;
  name: string;
  desc: string;
  slug?: string | undefined;
  image?: string;
};

export type categoryTypeArr = {
  id:string;
  name: string;
  desc: string;
  slug?: string | undefined;
  image?: string;
}[];


export const categorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Category name is required" })
    .max(30, { message: "Category name is to long" }),
  productDesc: z
    .string()
    .min(1, { message: "Categoy Descrition of product is needed" })
    .max(100, { message: "Categoy Description is too long" }),
    slug: z
    .string().optional(),
    // .min(4, { message: "productDescrition of product is needed" })
    // .max(100, { message: "productDescription is too long" }),
   // image: z.any().refine((file: File) => file?.length !== 0, "File is required"),
   image:z.any().optional(),
});

export type TcategorySchema = z.infer<typeof categorySchema>;

export const editCategorySchema = z.object({
  id: z
    .string()
    .trim()
    .min(1, { message: "Category name is required" }),
  name: z
    .string()
    .trim()
    .min(1, { message: "Category name is required" })
    .max(30, { message: "Category name is to long" }),
  productDesc: z
    .string()
    .min(4, { message: "productDescrition of product is needed" })
    .max(100, { message: "productDescription is too long" }),
    slug: z
    .string()
    .min(4, { message: "productDescrition of product is needed" })
    .max(100, { message: "productDescription is too long" }),
   // image: z.any().refine((file: File) => file?.length !== 0, "File is required"),
    image:z.any().optional(),
});

export type TeditCategorySchema = z.infer<typeof editCategorySchema>;