// lib/apollo-client.ts
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { SchemaLink } from '@apollo/client/link/schema';
// ✅ Correct
import { addMocksToSchema } from '@graphql-tools/mock';
import { makeExecutableSchema } from '@graphql-tools/schema/makeExecutableSchema';


// ✅ Define GraphQL schema
const typeDefs = gql`
  type Attendee {
    id: ID!
    name: String!
    email: String
  }

  type Event {
    id: ID!
    title: String!
    date: String!
    attendees: [Attendee!]!
  }

  type Query {
    events: [Event!]!
    event(id: ID!): Event
  }

  type Mutation {
    createEvent(title: String!, date: String!, tagIds: [ID!]): Event!
  }
`;

// ✅ Mock resolvers
const mocks = {
  Query: () => ({
    events: () => [
      {
        id: '1',
        title: 'Mocked Event 1',
        date: '2025-07-30',
        attendees: [
          { id: 'a1', name: 'Alice', email: 'alice@example.com' },
          { id: 'a2', name: 'Bob', email: 'bob@example.com' },
        ],
      },
      {
        id: '2',
        title: 'Mocked Event 2',
        date: '2025-08-01',
        attendees: [],
      },
    ],
    event: (_: any, args: any) => {
      const { id } = args || {};
      return {
        id,
        title: `Mock Event ${id}`,
        date: '2025-08-15',
        attendees: [
          { id: 'a1', name: 'Charlie', email: 'charlie@example.com' },
        ],
      };
    },
  }),

  Mutation: () => ({
    createEvent: (_: any, args: any) => {
      const { title = 'Untitled', date = new Date().toISOString().split('T')[0] } = args || {};
      return {
        id: Date.now().toString(),
        title,
        date,
        attendees: [],
      };
    },
  }),
};

// ✅ Build executable schema and apply mocks
const schema = makeExecutableSchema({ typeDefs });

const schemaWithMocks = addMocksToSchema({
  schema,
  mocks,
  preserveResolvers: true, // required if you want to use args
});

// ✅ Create Apollo Client with mocked schema
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new SchemaLink({ schema: schemaWithMocks }),
});

export default client;