// lib/ApolloWrapper.tsx
'use client';

import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink  } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql', // ✅ Update with correct URL
    fetchOptions: {
      mode: 'cors',
    },
  }),
  cache: new InMemoryCache(),
});

export function ApolloWrapper({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
export { ApolloProvider };

