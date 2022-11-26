import { GraphQLError } from "graphql";

export default function validateInput(input: any, requiredKeys: string[]) {
  for (const key in requiredKeys) {
    if (!input[key]) {
      throw new GraphQLError(`${key} is required`);
    }
  }
}
