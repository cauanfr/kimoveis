import { z } from "zod";
import { baseSchema } from "../../@shared";

export const categorySchema = baseSchema.extend({
  name: z.string().min(1).max(45).toLowerCase(),
});

export const categoryCreateSchema = categorySchema.omit({ id: true });
