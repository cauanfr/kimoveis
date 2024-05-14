import express, { Application, json } from "express";
import { checkEnvVariables } from "./config";

function initApp(): Application {
  const app: Application = express();
  app.use(json());

  checkEnvVariables();

  return app;
}

export default initApp();
