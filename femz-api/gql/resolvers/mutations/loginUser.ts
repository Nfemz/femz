import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { GraphQLError } from "graphql";
import { GQLContext } from "../../../server";
import { MutationLoginUserArgs } from "../resolvers-types";

export default async function loginUser(
  _parent: undefined,
  { input }: MutationLoginUserArgs,
  { prisma, user }: GQLContext
): Promise<User | null> {
  if (user) return user;

  if (!input) return null;

  const { email, password } = input;

  const encryptedPassword = await bcrypt.hash(password, 10);

  const foundUser = prisma.user.findFirst({
    where: {
      email,
      password: encryptedPassword,
    },
  });

  if (!foundUser) {
    throw new GraphQLError(
      "No user was found for this email and password combination"
    );
  }

  return foundUser;
}
