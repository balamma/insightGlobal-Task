"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const uuid_1 = require("uuid");
//import type { Resolvers } from "./types.js";
const events = [];
exports.resolvers = {
    Query: {
        events: () => events,
        event: (_, { id }) => events.find((e) => e.id === id),
    },
    Mutation: {
        createEvent: (_, { title, date }) => {
            const event = { id: (0, uuid_1.v4)(), title, date, attendees: [], tags: [] };
            events.push(event);
            return event;
        },
        addAttendee: (_, { eventId, name, email }) => {
            const event = events.find((e) => e.id === eventId);
            if (!event)
                throw new Error("Event not found");
            const attendee = { id: (0, uuid_1.v4)(), name, email, rsvp: "YES" };
            event.attendees.push(attendee);
            return attendee;
        },
        removeAttendee: (_, { eventId, attendeeId }) => {
            const event = events.find((e) => e.id === eventId);
            if (!event)
                throw new Error("Event not found");
            event.attendees = event.attendees.filter((a) => a.id !== attendeeId);
            return event;
        },
    },
};
