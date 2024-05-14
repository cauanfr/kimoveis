import { userSchema } from "../users/schemas";

export const sessionCreateSchema = userSchema.pick({
  email: true,
  password: true,
});
