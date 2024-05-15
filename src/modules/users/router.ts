import { Router } from "express";
import {
  DynamicParamsIdFinder,
  DynamicUniqueFieldFinder,
  isAdmin,
  isUnique,
  paramsIdExists,
  validBody,
  validToken,
} from "../../@shared";
import {
  userCreateController,
  userDeleteController,
  userReadController,
  userRetrieveController,
  userUpdatePartialController,
} from "./controllers";
import { isAdminOrOwner } from "./middlewares";
import { userCreateSchema, userUpdateSchema } from "./schemas";

export const userRouter = Router();

const paramsIdConfig: DynamicParamsIdFinder = {
  error: "User not found.",
  model: "user",
  searchKey: "userId",
};

const uniqueEmailConfig: DynamicUniqueFieldFinder<"user"> = {
  error: "E-mail already exists.",
  field: "email",
  model: "user",
};

userRouter.post(
  "/register",
  validBody(userCreateSchema),
  isUnique(uniqueEmailConfig),
  userCreateController
);

userRouter.use("", validToken);

userRouter.get("", isAdmin, userReadController);
userRouter.get("/profile", userRetrieveController);

userRouter.use("/:userId", isAdminOrOwner, paramsIdExists(paramsIdConfig));

userRouter.patch(
  "/:userId",
  validBody(userUpdateSchema),
  isUnique(uniqueEmailConfig),
  userUpdatePartialController
);

userRouter.delete("/:userId", userDeleteController);
