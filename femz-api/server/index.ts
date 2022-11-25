import { ApolloServer, BaseContext } from "@apollo/server";
import { Prisma, PrismaClient, User } from "@prisma/client";
import { loadSchemaSync } from "@graphql-tools/load";
import { loadFilesSync } from "@graphql-tools/load-files";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { mergeResolvers } from "@graphql-tools/merge";
import path from "path";
import type { Resolvers } from "../gql/resolvers/resolvers-types";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import http from "http";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import cors from "cors";
import bodyParser from "body-parser";
import { GraphQLError } from "graphql";

export interface GQLContext extends BaseContext {
  user: User | null;
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
}

const unauthorizedOperations = ["LoginUser", "SignupUser"];

(async function main() {
  const app = express();
  const prisma = new PrismaClient();
  const httpServer = http.createServer(app);

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
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();

  app.use(
    "/",
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware<GQLContext>(server, {
      context: async ({ req }) => {
        const token = req.headers.authorization;

        const user = token
          ? await prisma.user.findUnique({
              where: {
                token,
              },
            })
          : null;

        if (!unauthorizedOperations.includes(req.body.operationName) && !user) {
          throw new GraphQLError("User must be logged in.", {
            extensions: {
              code: "UNAUTHENTICATED",
              http: {
                stauts: 401,
              },
            },
          });
        }

        return {
          user,
          prisma,
        };
      },
    })
  );

  await httpServer.listen({ port: 4000 });
  console.log("Apollo server started");
})();
