import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient, User } from "@prisma/client";
import { MutationSignupUserArgs } from "../resolvers-types";

const prisma = new PrismaClient();

export default async function signupUser(
  _: any,
  { input }: MutationSignupUserArgs
): Promise<User | null> {
  if (!input) return null;

  const { email, password, firstName } = input;

  const encryptedPassword = await bcrypt.hash(password, 10);

  const token = jwt.sign({ email }, "UNSAFE_STRING", { expiresIn: "2h" });

  return await prisma.user.create({
    data: {
      firstName,
      email,
      password: encryptedPassword,
      token,
    },
  });
}
