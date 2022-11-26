import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "gql/typeDefinitions/schema.graphql",
  generates: {
    "gql/resolvers/resolvers-types.d.ts": {
      config: {
        useIndexSignature: true,
        maybeValue: "T | null | undefined",
        inputMaybeValue: "T | null | undefined",
      },
      plugins: ["typescript", "typescript-resolvers"],
    },
  },
};

export default config;
