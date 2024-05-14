import { Router } from "express";
import {
  DynamicParamsIdFinder,
  isAdmin,
  paramsIdExists,
  validBody,
  validToken,
} from "../../@shared";
import {
  userCreateController,
  userDeleteController,
  userReadController,
  userUpdatePartialController,
} from "./controllers";
import { isEmailUnique } from "./middlewares";
import { userCreateSchema, userUpdateSchema } from "./schemas";

export const userRouter = Router();

const paramsIdConfig: DynamicParamsIdFinder = {
  error: "User not found.",
  model: "user",
  searchKey: "userId",
};

userRouter.post(
  "/register",
  validBody(userCreateSchema),
  isEmailUnique,
  userCreateController
);

userRouter.use("*", validToken);

userRouter.get("", isAdmin, userReadController);

userRouter.use("/:userId", paramsIdExists(paramsIdConfig));

userRouter.patch(
  "/:userId",
  validBody(userUpdateSchema),
  isEmailUnique,
  userUpdatePartialController
);

userRouter.delete("/:userId", userDeleteController);
