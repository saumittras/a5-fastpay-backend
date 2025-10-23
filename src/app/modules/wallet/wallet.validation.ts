import z from "zod";
import { WalletStatus, WalletType } from "./wallet.interface";

export const createWalletZodSchema = z.object({
  _id: z.string().optional(),
  userId: z.string(),
  walletNo: z
    .string({ invalid_type_error: "Address must be String" })
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
      message:
        "Phone number must be valid for Bangladesh, Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    }),
  pinNumber: z
    .string({ invalid_type_error: "Name must be string" })
    .min(4, { message: "Pin Number Must be 6 Digit" })
    .max(4, { message: "Pin Number Must be 6 Digit" }),
  balance: z.number(),
  walletType: z.enum(Object.values(WalletType) as [string]),
  walletStatus: z
    .enum(Object.values(WalletStatus) as [string])
    .default(WalletType.USER),
  blockedReason: z.string().optional(),
  isNIDVerified: z.boolean(),
});
