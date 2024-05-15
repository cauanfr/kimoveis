import { Application } from "express";
import { categoryRouter, sessionRouter, userRouter } from "./modules";

export function initRouters(app: Application): void {
  app.use("/api/users", userRouter);
  app.use("/api/login", sessionRouter);
  app.use("/api/categories", categoryRouter);
}
