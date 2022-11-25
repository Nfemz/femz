import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";
import { MutationLoginUserArgs } from "../resolvers-types";

const prisma = new PrismaClient();

export default async function loginUser(
  _: any,
  { input }: MutationLoginUserArgs
): Promise<User | null> {
  if (!input) return null;

  const { email, password } = input;

  const encryptedPassword = await bcrypt.hash(password, 10);

  return await prisma.user.findFirst({
    where: {
      email,
      password: encryptedPassword,
    },
  });
}
