import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import { prisma } from "../../prisma";
import { ForbiddenError, NotFoundError, UnauthorizedError } from "../errors";
import { DynamicParamsIdFinder, PrismaClientGeneric } from "./interfaces";
import { verify } from "jsonwebtoken";
import { User } from "@prisma/client";

export function validBody(schema: AnyZodObject) {
  return function (req: Request, _res: Response, next: NextFunction) {
    req.body = schema.parse(req.body);
    return next();
  };
}

export function paramsIdExists({
  error,
  model,
  searchKey,
}: DynamicParamsIdFinder) {
  return async function (req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params[searchKey]);
    const client = prisma[model] as PrismaClientGeneric;

    const foundResource = await client.findFirst({ where: { id } });

    if (!foundResource) throw new NotFoundError(error);

    res.locals = { ...res.locals, foundResource };

    return next();
  };
}

export async function validToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new UnauthorizedError("Missing header authorization key.");
  }

  const [_bearer, token] = authorization.split(" ");

  if (!token) {
    throw new UnauthorizedError("Missing bearer token.");
  }

  const { JWT_SECRET } = process.env;

  const decoded = verify(token, JWT_SECRET);
  const foundSubject = await prisma.user.findFirst({
    where: { id: Number(decoded.sub!), deletedAt: null },
  });

  if (!foundSubject) {
    throw new UnauthorizedError("User token is inactivated.");
  }

  res.locals = { ...res.locals, decoded, foundSubject };

  return next();
}

export async function isAdmin(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  const foundSubject = res.locals.foundSubject as User;

  if (!foundSubject.admin) {
    throw new ForbiddenError("Insufficient permission.");
  }

  return next();
}
