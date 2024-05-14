import { Request, Response } from "express";
import {
  userCreateService,
  userDeleteService,
  userUpdatePartialService,
  userReadService,
} from "./services";

export async function userCreateController(req: Request, res: Response) {
  const newUser = await userCreateService(req.body);
  return res.status(201).json(newUser);
}

export async function userReadController(_req: Request, res: Response) {
  const allUsers = await userReadService();
  return res.status(200).json(allUsers);
}

export async function userUpdatePartialController(req: Request, res: Response) {
  const { foundResource: user } = res.locals;
  const updatedUser = await userUpdatePartialService(user, req.body);

  return res.status(200).json(updatedUser);
}

export async function userDeleteController(req: Request, res: Response) {
  const { foundResource: user } = res.locals;
  await userDeleteService(user);

  return res.status(204).json();
}
