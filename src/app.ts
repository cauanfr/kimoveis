import cors from "cors";
import express, { Application, json } from "express";
import "express-async-errors";
import helmet from "helmet";
import { checkEnvVariables } from "./config";
import { handleGlobalErrors } from "./errors";
import { initRouters } from "./routes";

function initApp(): Application {
  const app: Application = express();

  app.use(json());
  app.use(cors());
  app.use(helmet());

  checkEnvVariables();
  initRouters(app);

  app.use(handleGlobalErrors);

  return app;
}

export default initApp();
