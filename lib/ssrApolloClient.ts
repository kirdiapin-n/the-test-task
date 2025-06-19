import { API_PATH } from "@/constants/app";
import { ApolloClient, InMemoryCache, HttpLink, NormalizedCacheObject } from "@apollo/client";
import { headers } from "next/headers";
import { cache } from "react";

export const getClient = cache(
  (customHeaders?: Record<string, string | string[] | undefined>): ApolloClient<NormalizedCacheObject> => {
    const host = (headers() as unknown as { get: (v: string) => string }).get("host");
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    const uri = `${protocol}://${host + API_PATH}`;

    return new ApolloClient({
      ssrMode: true,
      link: new HttpLink({
        uri,
        fetch,
        headers: customHeaders as Record<string, string>,
      }),
      cache: new InMemoryCache(),
    });
  }
);
