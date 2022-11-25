import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import { MutationSignupUserArgs } from "../resolvers-types";
import { GQLContext } from "../../../server";

export default async function signupUser(
  _parent: undefined,
  { input }: MutationSignupUserArgs,
  { prisma, user }: GQLContext
): Promise<User | null> {
  if (user) return user;

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
