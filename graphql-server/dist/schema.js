"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_1 = require("apollo-server");
exports.typeDefs = (0, apollo_server_1.gql) `
  type Event {
    id: ID!
    title: String!
    date: String!
    attendees: [Attendee!]!
    tags: [String!]!
  }

  type Attendee {
    id: ID!
    name: String!
    email: String
    rsvp: String
  }

  type Query {
    events: [Event!]!
    event(id: ID!): Event
  }

  type Mutation {
      createEvent(title: String!, date: String!, tagIds: [ID!]): Event!
    addAttendee(eventId: ID!, name: String!, email: String): Attendee!
    removeAttendee(eventId: ID!, attendeeId: ID!): Event!
  }
`;
