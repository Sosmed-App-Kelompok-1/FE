import * as z from "zod";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  image: string;
}
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const updateUserSchema = z.object({
  name: z.string().min(1, { message: "Full name is required" }).max(50),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Invalid email"),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must have than 8 characters" }),
  image: z
    .any()
    .refine((files) => files?.length == 1, "Image is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, and .png files are accepted."
    )
    .optional()
    .or(z.literal("")),
});

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;