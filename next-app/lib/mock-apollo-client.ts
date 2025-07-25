// lib/mock-apollo-client.ts
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { SchemaLink } from '@apollo/client/link/schema';
import { makeExecutableSchema } from '@graphql-tools/schema';
// ✅ Correct
import { addMocksToSchema } from '@graphql-tools/mock';


//import typeDefs from '@/graphql/typeDefs';
//import { typeDefs } from './schema';

import typeDefs from '../graphql/typeDefs';


const schema = makeExecutableSchema({ typeDefs });

// ✅ 2. Add mocks to schema
const mockedSchema = addMocksToSchema({
  schema,
  mocks: {
    Query: () => ({
      events: () => [
        {
          id: '1',
          title: 'Mock Event 1',
          date: '2025-07-30',
          attendees: [
            { id: 'a1', name: 'Alice', email: 'alice@example.com' },
            { id: 'a2', name: 'Bob', email: 'bob@example.com' },
          ],
          tags: [],
        },
        {
          id: '2',
          title: 'Mock Event 2',
          date: '2025-08-01',
          attendees: [],
          tags: [],
        },
      ],
      event: (_: any, args: any) => {
        const { id } = args;
        return {
          id,
          title: `Mock Event ${id}`,
          date: '2025-07-30',
          attendeeCount: 2,
          attendees: [
            { id: 'a1', name: 'Alice', email: 'alice@example.com' },
            { id: 'a2', name: 'Bob', email: 'bob@example.com' },
          ],
        };
      },
    }),
    Mutation: () => ({
      createEvent: (_: any, args: any) => {
        if (!args) throw new Error("Args is undefined in createEvent");

        const { title, date, tagIds } = args;
        return {
          id: Date.now().toString(),
          title,
          date,
          attendees: [],
          tags: tagIds?.map((id: string) => ({ id })) || [],
        };
      },
    }),
  },
  preserveResolvers: false,
});

// ✅ 3. Use SchemaLink to simulate API
const mockClient = new ApolloClient({
  link: new SchemaLink({ schema: mockedSchema }),
  cache: new InMemoryCache(),
});

export default mockClient;