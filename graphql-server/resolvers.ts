interface Event {
  id: string;
  name: string;
  date: string;
  attendees: string[];
}

let events: Event[] = [];

export const resolvers = {
  Query: {
    events: () => events,
    event: (_: any, { id }: { id: string }) => events.find(e => e.id === id),
  },
  Mutation: {
    createEvent: (_: any, { name, date }: { name: string; date: string }) => {
      const newEvent = {
        id: String(events.length + 1),
        name,
        date,
        attendees: [],
      };
      events.push(newEvent);
      return newEvent;
    },
    addAttendee: (_: any, { id, attendee }: { id: string; attendee: string }) => {
      const event = events.find(e => e.id === id);
      if (!event) throw new Error('Event not found');
      event.attendees.push(attendee);
      return event;
    },
  },
};
