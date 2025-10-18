import z from "zod";
import { AccountStatus, Role } from "./user.interface";

export const createUserZodSchema = z.object({
  _id: z.string().optional(),
  name: z
    .string({ invalid_type_error: "Name must be string" })
    .min(2, { message: "Name too short" })
    .max(50, { message: "Name too long" }),
  email: z.string().email().optional(),
  phone: z
    .string({ invalid_type_error: "Address must be String" })
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
      message:
        "Phone number must be valid for Bangladesh, Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    }),
  password: z
    .string()
    .min(8)
    .regex(/^(?=.*[A-Z])/, {
      message: "Password must contain at least 1 uppercase letter",
    })
    .regex(/^(?=.*[!@#$%^&*])/, {
      message: "Password must contain at least 1 special character.",
    })
    .regex(/^(?=.*\d)/, {
      message: "Password must contain at least 1 number",
    }),

  pinNumber: z
    .number({ invalid_type_error: "Name must be string" })
    .min(6, { message: "Pin Number Must be 6 Digit" })
    .max(6, { message: "Pin Number Must be 6 Digit" }),
  picture: z.string().optional(),
  address: z
    .string({ invalid_type_error: "Address must be string" })
    .max(200, { message: "Address can notexceed 200 characters" })
    .optional(),
  isDeleted: z.boolean(),
  isActive: z.enum(Object.values(AccountStatus) as [string]),
  role: z.enum(Object.values(Role) as [string]),
  isVerified: z.boolean().optional(),
  createdBy: z.enum(Object.values(Role) as [string]),
});

export const UpdateUserZodSchema = z.object({
  _id: z.string().optional(),
  name: z
    .string({ invalid_type_error: "Name must be string" })
    .min(2, { message: "Name too short" })
    .max(50, { message: "Name too long" }),
  email: z.string().email().optional(),
  phone: z
    .string({ invalid_type_error: "Address must be String" })
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
      message:
        "Phone number must be valid for Bangladesh, Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    })
    .optional(),
  password: z
    .string()
    .min(8)
    .regex(/^(?=.*[A-Z])/, {
      message: "Password must contain at least 1 uppercase letter",
    })
    .regex(/^(?=.*[!@#$%^&*])/, {
      message: "Password must contain at least 1 special character.",
    })
    .regex(/^(?=.*\d)/, {
      message: "Password must contain at least 1 number",
    })
    .optional(),

  pinNumber: z
    .number({ invalid_type_error: "Name must be string" })
    .min(6, { message: "Pin Number Must be 6 Digit" })
    .max(6, { message: "Pin Number Must be 6 Digit" })
    .optional(),
  picture: z.string().optional(),
  address: z
    .string({ invalid_type_error: "Address must be string" })
    .max(200, { message: "Address can notexceed 200 characters" })
    .optional(),
  isDeleted: z.boolean().optional(),
  isActive: z.enum(Object.values(AccountStatus) as [string]).optional(),
  role: z.enum(Object.values(Role) as [string]).optional(),
  isVerified: z.boolean().optional(),
  createdBy: z.enum(Object.values(Role) as [string]).optional(),
});
