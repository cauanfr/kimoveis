import { NextFunction, Request, Response } from "express";
import { prisma } from "../../../prisma";
import { ConflictError, ForbiddenError } from "../../errors";
import { User } from "@prisma/client";

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

export async function isAdminOrOwner(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const paramsId = req.params.userId;
  const foundSubject = res.locals.foundSubject as User;

  if (foundSubject.admin || Number(paramsId) === foundSubject.id) {
    return next();
  }

  throw new ForbiddenError("Insufficient permission.");
}
