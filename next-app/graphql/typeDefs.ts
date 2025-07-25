const typeDefs = `#graphql
  type Attendee {
  id: ID!
  name: String!
  email: String
}

type Event {
  id: ID!
  title: String!
  date: String!
  attendees: [Attendee!]!   # ✅ Ensure this line exists
  tags: [Tag!]              # Optional: if you use tags
  attendeeCount: Int        # Optional: for GET_EVENT_BY_ID
}

type Query {
  events: [Event!]!
  event(id: ID!): Event
}

type Mutation {
  createEvent(title: String!, date: String!, tagIds: [ID!]): Event!
}

type Tag {
  id: ID!
  name: String!
}


`;

export default typeDefs;
