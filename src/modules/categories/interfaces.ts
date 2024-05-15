import { z } from "zod";
import { categoryCreateSchema } from "./schemas";

export type CategoryCreate = z.infer<typeof categoryCreateSchema>