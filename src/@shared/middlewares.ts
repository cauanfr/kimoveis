import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import { prisma } from "../../prisma";
import { NotFoundError } from "../errors";
import { DynamicParamsIdFinder, PrismaClientGeneric } from "./interfaces";

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
