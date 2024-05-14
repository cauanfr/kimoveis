import { Application } from "express";
import { userRouter } from "./modules";

export function initRouters(app: Application): void {
  app.use("/api/users", userRouter);
}
