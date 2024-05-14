import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../prisma";
import { UnauthorizedError } from "../../errors";
import { SessionCreate, SessionReturn } from "./interfaces";

export async function sessionCreateService({
  email,
  password,
}: SessionCreate): Promise<SessionReturn> {
  const foundUser = await prisma.user.findFirst({ where: { email } });
  if (!foundUser) throw new UnauthorizedError("Invalid credentials.");

  const hasSamePass = await compare(password, foundUser.password);
  if (!hasSamePass) throw new UnauthorizedError("Invalid credentials.");

  const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

  const token = sign({}, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
    subject: foundUser.id.toString(),
  });

  return { token };
}
