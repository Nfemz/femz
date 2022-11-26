import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import { MutationSignupUserArgs } from "../resolvers-types";
import { GQLContext } from "../../../server";
import { GraphQLError } from "graphql";
import validateInput from "../../../helpers/validateInput";
import isEmail from "../../../helpers/isEmail";

export default async function signupUser(
  _parent: undefined,
  { input }: MutationSignupUserArgs,
  { prisma, user }: GQLContext
): Promise<User | null> {
  if (user) return user;

  if (!input) return null;

  const { email, password, firstName, passwordCopy } = input;

  validateInput(input, ["email", "password"]);

  if (!isEmail(email)) {
    throw new GraphQLError("Not a valid email format");
  }

  if (password !== passwordCopy) {
    throw new GraphQLError("Passwords must match");
  }

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
