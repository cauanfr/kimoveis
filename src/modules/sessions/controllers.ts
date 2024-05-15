import { Request, Response } from "express";
import { sessionCreateService } from "./services";

export async function sessionCreateController(
  req: Request,
  res: Response
): Promise<Response> {
  const token = await sessionCreateService(req.body);
  return res.status(201).json(token);
}
