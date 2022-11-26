import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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

  if (!email) {
    throw new GraphQLError("Email is required");
  }
  if (!password) {
    throw new GraphQLError("Password is required");
  }

  const foundUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (foundUser && (await bcrypt.compare(password, foundUser.password))) {
    const token = jwt.sign({ email, id: foundUser.id }, "UNSAFE_STRING", {
      expiresIn: "2h",
    });
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        token,
      },
    });
    return foundUser;
  } else {
    throw new GraphQLError(
      "No user was found for this email and password combination. Please try again."
    );
  }
}
