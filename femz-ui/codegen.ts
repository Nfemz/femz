import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:4000/graphql",
  documents: ["graphql/mutations/*.ts", "graphql/queries/*.ts"],
  generates: {
    "./graphql/types/": {
      plugins: ["typescript-operations"],
      config: {
        gqlTagName: "gql",
      },
    },
  },
};

export default config;
