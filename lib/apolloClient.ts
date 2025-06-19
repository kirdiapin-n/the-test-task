import { API_PATH } from "@/constants/app";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export const apolloClient = new ApolloClient({
  ssrMode: typeof window === "undefined",
  link: new HttpLink({
    uri: API_PATH,
    fetch,
  }),
  cache: new InMemoryCache(),
});
