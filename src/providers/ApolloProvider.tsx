"use client";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "https://api.hackthenorth.com/v3/frontend-challenge",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    fetchOptions: {
      method: 'POST',
    },
  }),
});

export default function ApolloClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
