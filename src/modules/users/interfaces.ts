import { z } from "zod";
import {
  userCreateSchema,
  userReturnSchema,
  userSchema,
  userUpdateSchema,
} from "./schemas";

export type User = z.infer<typeof userSchema>;

export type UserCreate = z.infer<typeof userCreateSchema>;
export type UserUpdate = z.infer<typeof userUpdateSchema>;
export type UserReturn = z.infer<typeof userReturnSchema>;

export type UserReturnAll = {
  data: UserReturn[];
};
