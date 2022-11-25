import { ApolloServer, BaseContext } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { Prisma, PrismaClient, User } from "@prisma/client";
import { loadSchemaSync } from "@graphql-tools/load";
import { loadFilesSync } from "@graphql-tools/load-files";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { mergeResolvers } from "@graphql-tools/merge";
import path from "path";
import type { Resolvers } from "../gql/resolvers/resolvers-types";

export interface GQLContext extends BaseContext {
  user: User | null;
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
}

(async function main() {
  const prisma = new PrismaClient();

  const typeDefs = await loadSchemaSync(
    path.join(__dirname, "../gql/typeDefinitions/schema.graphql"),
    {
      loaders: [new GraphQLFileLoader()],
    }
  );

  const resolverFiles = await loadFilesSync(
    path.join(__dirname, "../gql/resolvers/**/index.ts")
  );
  const resolvers: Resolvers = mergeResolvers(resolverFiles);

  const server = new ApolloServer<GQLContext>({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer<GQLContext>(server, {
    listen: { port: 4000 },
    context: async ({ req }) => {
      const token = req.headers.authorization;

      const user = await prisma.user.findUnique({
        where: {
          token,
        },
      });

      return { user, prisma };
    },
  });

  console.log(`🚀  Server ready at: ${url}`);
})();
