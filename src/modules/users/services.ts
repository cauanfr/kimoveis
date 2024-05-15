import { Prisma, User } from "@prisma/client";
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

export async function userReadService(email?: string): Promise<UserReturnAll> {
  const baseWhereClause: Prisma.UserFindManyArgs = {
    where: { deletedAt: { equals: null } },
  };

  if (email) {
    baseWhereClause.where = { ...baseWhereClause.where, email };
    const allUsers = await prisma.user.findMany(baseWhereClause);

    return { data: userReturnSchema.array().parse(allUsers) };
  }

  const allUsers = await prisma.user.findMany(baseWhereClause);
  return { data: userReturnSchema.array().parse(allUsers) };
}

export async function userRetrieveService(user: User): Promise<UserReturn> {
  return userReturnSchema.parse(user);
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
  await prisma.user.update({ where: { id }, data: { deletedAt: new Date() } });
}
