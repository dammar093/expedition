import * as z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" }),
  password: z.string().min(1, {
    message: "Password is required"
  })
});


export const registerSchema = z.object({
  name: z.string().min(1, {
    message: "Nmae is required"
  }),
  email: z
    .string()
    .email({ message: "Invalid email address" }),
  password: z.string({
    message: "Password is required"
  }).min(6, {
    message: "Password length at least 6"
  })
});

export const forgotPasswordSchema = z.object({
  email: z.string().email({
    message: "Invalid Email"
  }).min(1, {
    message: "Email is required"
  })
})
export const resetPasswodSchema = z.object({
  email: z.string().email({
    message: "Invalid Email"
  }).min(1, {
    message: "Email is required"
  }),
  password: z.string().min(6, {
    message: "Password length at least 6"
  }),
  confirmPassword: z.string().min(6, {
    message: "Confirm password length at least 6"
  })
})