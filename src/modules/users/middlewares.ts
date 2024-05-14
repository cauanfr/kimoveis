import { NextFunction, Request, Response } from "express";
import { prisma } from "../../../prisma";
import { ConflictError } from "../../errors";

export async function isEmailUnique(
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> {
  const { email } = req.body;
  if (!email) return next();

  const emailExists = await prisma.user.findUnique({ where: { email } });

  if (emailExists) throw new ConflictError("E-mail already exists.");

  return next();
}
