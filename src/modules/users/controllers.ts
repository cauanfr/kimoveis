import { Request, Response } from "express";
import {
  userCreateService,
  userDeleteService,
  userReadService,
  userRetrieveService,
  userUpdatePartialService,
} from "./services";

export async function userCreateController(
  req: Request,
  res: Response
): Promise<Response> {
  const newUser = await userCreateService(req.body);
  return res.status(201).json(newUser);
}

export async function userReadController(
  req: Request,
  res: Response
): Promise<Response> {
  const allUsers = await userReadService(req.query.email as string | undefined);
  return res.status(200).json(allUsers);
}

export async function userRetrieveController(
  _req: Request,
  res: Response
): Promise<Response> {
  const user = await userRetrieveService(res.locals.foundSubject);
  return res.status(200).json(user);
}

export async function userUpdatePartialController(
  req: Request,
  res: Response
): Promise<Response> {
  const { foundResource: user } = res.locals;
  const updatedUser = await userUpdatePartialService(user, req.body);

  return res.status(200).json(updatedUser);
}

export async function userDeleteController(
  _req: Request,
  res: Response
): Promise<Response> {
  await userDeleteService(res.locals.foundResource);
  return res.status(204).json();
}
