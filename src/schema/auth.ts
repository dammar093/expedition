import * as z from "zod";

export const loginSchema = z.object({
  email: z
    .string({
      message: "Email is required"
    })
    .email({ message: "Invalid email address" }),
  password: z.string({
    message: "Password is required"
  }).min(1, {
    message: "Password is required"
  })
});


export const registerSchema = z.object({
  name: z.string({
    message: "Name is required"
  }).min(1, {
    message: "Nmae is required"
  }),
  email: z
    .string({
      message: "Email is required"
    })
    .email({ message: "Invalid email address" }),
  password: z.string({
    message: "Password is required"
  }).min(1, {
    message: "Password is required"
  })
});
