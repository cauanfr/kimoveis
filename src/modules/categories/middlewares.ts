import { NextFunction, Request, Response } from "express";

export async function isCategoryNameUnique(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { name } = req.body;
  

  return next();
}
