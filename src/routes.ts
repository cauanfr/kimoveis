import { Application } from "express";
import { sessionRouter, userRouter } from "./modules";

export function initRouters(app: Application): void {
  app.use("/api/users", userRouter);
  app.use("/api/login", sessionRouter);
}
