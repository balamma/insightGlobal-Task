import { ApolloServer, gql } from 'apollo-server';


type Event = {
  id: string;
  title: string;
  date: string;
  attendees: Attendee[];
  tags: Tag[];
};
type Attendee = {
  id: string;
  name: string;
  email: string;
};
type Tag = {
  id: string;
  name: string;
};

let events: Event[] = [];
let tags: Tag[] = [];
let eventCounter = 0;
let tagCounter = 0;
let attendeeCounter = 0;


export const typeDefs = gql`
  type Attendee { id: ID! name: String! email: String }
  type Tag { id: ID! name: String! }
  type Event {
    id: ID!
    title: String!
    date: String!
    attendees: [Attendee!]!
    tags: [Tag!]!
  }
 type Query {
  events: [Event!]!
  event(id: ID!): Event
  tags: [Tag!]!
  getAllEvents: [Event!]!
}
  type Mutation {
    createEvent(title: String!, date: String!, tagIds: [ID!]): Event!
    addAttendee(eventId: ID!, name: String!, email: String): Attendee!
    removeAttendee(eventId: ID!, attendeeId: ID!): Boolean!
    createTag(name: String!): Tag!
  }
`;
export const resolvers = {
  Query: {
    events: () => events,
    event: (_: unknown, args: { id: string }) =>
      events.find((e) => e.id === args.id),
    tags: () => tags,
  },

  Mutation: {
    createEvent: (
      _: unknown,
      args: { title: string; date: string; tagIds?: string[] }
    ): Event => {
      const { title, date, tagIds } = args;
      const newEvent: Event = {
        id: `e${++eventCounter}`,
        title,
        date,
        attendees: [],
        tags: tags.filter((t) => (tagIds ?? []).includes(t.id)),
      };
      events.push(newEvent);
      return newEvent;
    },

    addAttendee: (
      _: unknown,
      args: { eventId: string; name: string; email: string }
    ): Attendee => {
      const { eventId, name, email } = args;
      const event = events.find((ev) => ev.id === eventId);
      if (!event) throw new Error('Event not found');

      const newAttendee: Attendee = {
        id: `a${++attendeeCounter}`,
        name,
        email,
      };
      event.attendees.push(newAttendee);
      return newAttendee;
    },

    removeAttendee: (
      _: unknown,
      args: { eventId: string; attendeeId: string }
    ): boolean => {
      const event = events.find((ev) => ev.id === args.eventId);
      if (!event) return false;
      event.attendees = event.attendees.filter(
        (a) => a.id !== args.attendeeId
      );
      return true;
    },

    createTag: (_: unknown, args: { name: string }): Tag => {
      const { name } = args;
      const newTag: Tag = {
        id: `t${++tagCounter}`,
        name,
      };
      tags.push(newTag);
      return newTag;
    },
  },
};