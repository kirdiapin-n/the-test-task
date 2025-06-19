"use client";

import { apolloClient } from "@/lib/apolloClient";
import { ApolloProvider } from "@apollo/client";
import { MantineProvider } from "@mantine/core";
import { ReactNode } from "react";

export function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <ApolloProvider client={apolloClient}>
      <MantineProvider>{children}</MantineProvider>
    </ApolloProvider>
  );
}
