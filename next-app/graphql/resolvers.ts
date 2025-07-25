interface Attendee {
  id: string;
  name: string;
  email?: string;
}

interface Event {
  id: string;
  title: string;
  date: string;
  attendees: Attendee[];
}

let events: Event[] = [];

export const resolvers = {
  Query: {
    events: () => events,
    event: (_: any, { id }: { id: string }) => events.find(e => e.id === id),
  },

  Mutation: {
    addAttendee: (
      _: any,
      { id, name }: { id: string; name: string }
    ): Attendee | null => {
      const event = events.find(e => e.id === id);
      if (!event) return null;
      const newAttendee: Attendee = {
        id: `${Date.now()}`,
        name,
        email: `${name.toLowerCase().replace(/\s+/g, '')}@example.com`,
      };
      event.attendees.push(newAttendee);
      return newAttendee;
    },

    removeAttendee: (
      _: any,
      { id, name }: { id: string; name: string }
    ): Attendee | null => {
      const event = events.find(e => e.id === id);
      if (!event) return null;

      const index = event.attendees.findIndex(a => a.name === name);
      if (index === -1) return null;

      const [removed] = event.attendees.splice(index, 1);
      return removed;
    },
  },
};
