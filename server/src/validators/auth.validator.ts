import { z } from "zod";

export const emailSchema = z.string().trim().email().min(1).max(255);

export const passwordSchema = z.string().trim().min(6).max(255);

export const verificationCodeSchema = z.string().trim().min(1).max(25);

export const registerValidator = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    name: z.string().trim().min(1).max(255),
    confirmPassword: passwordSchema,
    userAgent: z.string().optional(),
  })
  .refine((val) => val.password === val.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"],
  });

export const loginValidator = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const verificationCodeValidator = z.object({
  code: verificationCodeSchema,
});

export const sendMailVerifyValidator = z.object({
  email: emailSchema,
});

export const verifyOtpValidator = z.object({
  email: emailSchema,
  code: verificationCodeSchema,
});

export const forgotPasswordValidator = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword);
