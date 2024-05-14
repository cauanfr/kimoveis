import { Router } from "express";
import { validBody } from "../../@shared";
import { sessionCreateController } from "./controllers";
import { sessionCreateSchema } from "./schemas";

export const sessionRouter = Router();

sessionRouter.post("", validBody(sessionCreateSchema), sessionCreateController);
