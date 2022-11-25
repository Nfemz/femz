import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { loadSchemaSync } from "@graphql-tools/load";
import { loadFilesSync } from "@graphql-tools/load-files";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { mergeResolvers } from "@graphql-tools/merge";
import path from "path";
import type { Resolvers } from "../gql/resolvers/resolvers-types";

async function main() {
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

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
}

main();
