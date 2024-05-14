import { User } from "@prisma/client";
import { hash } from "bcryptjs";
import { prisma } from "../../../prisma";
import {
  UserCreate,
  UserReturn,
  UserReturnAll,
  UserUpdate,
} from "./interfaces";
import { userReturnSchema } from "./schemas";

export async function userCreateService(data: UserCreate): Promise<UserReturn> {
  data.password = await hash(data.password, 10);
  const newUser = await prisma.user.create({ data });

  return userReturnSchema.parse(newUser);
}

export async function userReadService(): Promise<UserReturnAll> {
  const allUsers = await prisma.user.findMany();
  return { data: userReturnSchema.array().parse(allUsers) };
}

export async function userUpdatePartialService(
  { id }: User,
  data: UserUpdate
): Promise<UserReturn> {
  if (data.password) {
    data.password = await hash(data.password, 10);
  }

  const updatedUser = await prisma.user.update({ where: { id }, data });

  return userReturnSchema.parse(updatedUser);
}

export async function userDeleteService({ id }: User): Promise<void> {
  await prisma.user.delete({ where: { id } });
}
