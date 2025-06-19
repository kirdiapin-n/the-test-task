import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:3000/api/graphql",
  documents: ["graphql/**/*.ts"],
  generates: {
    "graphql/types.ts": {
      config: {
        skipTypename: true,
        typesPrefix: "I",
        namingConvention: {
          enumValues: "keep",
        },
        declarationKind: "interface",
        withHooks: false,
      },
      plugins: ["typescript", "typescript-operations"],
      hooks: {
        afterOneFileWrite: ["prettier --write"],
      },
    },
  },
};

export default config;
