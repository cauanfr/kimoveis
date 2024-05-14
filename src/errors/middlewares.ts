import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import { ZodError } from "zod";
import { AppError } from "./classes/AppError";

export function handleGlobalErrors(
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
): Response {
  if (err instanceof AppError) {
    return res.status(err.status).json({ error: err.message });
  }

  if (err instanceof JsonWebTokenError) {
    return res.status(401).json({ error: err.message });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({ error: err.errors });
  }

  console.error(err);
  return res.status(500).json({ error: "Internal Server Error." });
}
