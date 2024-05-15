import { Router } from "express";
import {
  DynamicUniqueFieldFinder,
  isAdmin,
  isUnique,
  validBody,
  validToken,
} from "../../@shared";
import {
  categoryCreateController,
  categoryReadController,
} from "./controllers";
import { categoryCreateSchema } from "./schemas";

export const categoryRouter = Router();

const uniqueNameConfig: DynamicUniqueFieldFinder<"category"> = {
  error: "Category already exists.",
  field: "name",
  model: "category",
};

categoryRouter.get("", categoryReadController);

categoryRouter.use("", validToken, isAdmin);
categoryRouter.post(
  "",
  validBody(categoryCreateSchema),
  isUnique(uniqueNameConfig),
  categoryCreateController
);
