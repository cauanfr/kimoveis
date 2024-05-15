import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AnyZodObject } from "zod";
import { prisma } from "../../prisma";
import {
  ConflictError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from "../errors";
import {
  DynamicParamsIdFinder,
  DynamicUniqueFieldFinder,
  PrismaClientGeneric,
  PrismaClientKeys,
  PrismaUniqueWhereClauseDynamic,
} from "./interfaces";

export function validBody(schema: AnyZodObject) {
  return function (req: Request, _res: Response, next: NextFunction): void {
    req.body = schema.parse(req.body);
    return next();
  };
}

export function paramsIdExists({
  error,
  model,
  searchKey,
}: DynamicParamsIdFinder) {
  return async function (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
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
): Promise<void> {
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
): Promise<void> {
  const foundSubject = res.locals.foundSubject as User;

  if (!foundSubject.admin) {
    throw new ForbiddenError("Insufficient permission.");
  }

  return next();
}

export function isUnique({
  error,
  field,
  model,
}: DynamicUniqueFieldFinder<PrismaClientKeys>) {
  return async function (
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> {
    const key = req.body[field] as string;
    const client = prisma[model] as PrismaClientGeneric;
    const where = { [field]: key } as unknown as PrismaUniqueWhereClauseDynamic;

    const foundUnique = await client.findUnique({ where });

    if (foundUnique) throw new ConflictError(error);

    return next();
  };
}
