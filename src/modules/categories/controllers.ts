import { Request, Response } from "express";
import { categoryCreateService, categoryReadService } from "./services";

export async function categoryCreateController(
  req: Request,
  res: Response
): Promise<Response> {
  const newCategory = await categoryCreateService(req.body);
  return res.status(201).json(newCategory);
}

export async function categoryReadController(
  _req: Request,
  res: Response
): Promise<Response> {
  const allCategories = await categoryReadService();
  return res.status(200).json(allCategories);
}
