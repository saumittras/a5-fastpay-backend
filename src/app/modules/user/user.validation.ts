import z from "zod";
import { Role, status } from "./user.interface";

export const createUserZodSchema = z.object({
  _id: z.string().optional(),
  name: z
    .string({ invalid_type_error: "Name must be string" })
    .min(2, { message: "Name too short" })
    .max(50, { message: "Name too long" }),
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
    .string({ invalid_type_error: "Name must be string" })
    .min(4, { message: "Pin Number Must be 4 Digit" })
    .max(4, { message: "Pin Number Must be 4Digit" }),
  picture: z.string().optional(),
  address: z
    .string({ invalid_type_error: "Address must be string" })
    .max(200, { message: "Address can note exceed 200 characters" })
    .optional(),
  accountStatus: z.enum(Object.values(status) as [string]),
  agentRequest: z.boolean().optional(),
  role: z.enum(Object.values(Role) as [string]).optional(),
  createdBy: z.enum(Object.values(Role) as [string]),
});

export const UpdateUserZodSchema = z.object({
  _id: z.string().optional(),
  name: z
    .string({ invalid_type_error: "Name must be string" })
    .min(2, { message: "Name too short" })
    .max(50, { message: "Name too long" })
    .optional(),
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
    .string({ invalid_type_error: "Name must be string" })
    .min(4, { message: "Pin Number Must be 4 Digit" })
    .max(4, { message: "Pin Number Must be 4 Digit" })
    .optional(),
  picture: z.string().optional(),
  address: z
    .string({ invalid_type_error: "Address must be string" })
    .max(200, { message: "Address can not exceed 200 characters" })
    .optional(),
  accountStatus: z.enum(Object.values(status) as [string]).optional(),
  agentRequest: z.boolean().optional().optional(),
  role: z.enum(Object.values(Role) as [string]).optional(),
  createdBy: z.enum(Object.values(Role) as [string]).optional(),
});
