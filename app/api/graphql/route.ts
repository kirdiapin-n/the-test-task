import { typeDefs } from "@/graphql/schema";
import { resolvers } from "@/graphql/resolvers";
import { createSchema, createYoga } from "graphql-yoga";
import { NextRequest } from "next/server";

const yoga = createYoga<{
  req: NextRequest;
}>({
  graphqlEndpoint: "/api/graphql",
  schema: createSchema({ typeDefs, resolvers }),
  fetchAPI: { Request, Response },
});

export async function GET(request: NextRequest) {
  return yoga(request);
}

export async function POST(request: NextRequest) {
  return yoga(request);
}
