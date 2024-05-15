import { baseSchema } from "../../@shared";
import { z } from "zod";

export const userSchema = baseSchema.extend({
  name: z.string().min(1).max(45),
  email: z.string().email().min(1).max(45).toLowerCase(),
  admin: z.boolean().default(false),
  password: z.string().min(1),

  createdAt: z
    .date()
    .or(z.string())
    .transform((d) => d.toLocaleString()),
  updatedAt: z
    .date()
    .or(z.string())
    .transform((d) => d.toLocaleString()),
  deletedAt: z.date().or(z.string()).nullish(),
});

export const userCreateSchema = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

export const userUpdateSchema = userCreateSchema
  .omit({ admin: true })
  .partial();

export const userReturnSchema = userSchema.omit({ password: true });
