import { Category } from "@prisma/client";
import { prisma } from "../../../prisma";
import { CategoryCreate } from "./interfaces";

export async function categoryCreateService(
  data: CategoryCreate
): Promise<Category> {
  return prisma.category.create({ data });
}

export async function categoryReadService(): Promise<{ data: Category[] }> {
  return { data: await prisma.category.findMany() };
}
