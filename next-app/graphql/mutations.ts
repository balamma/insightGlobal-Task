import { gql } from '@apollo/client';

export const CREATE_EVENT = gql`
  mutation CreateEvent($title: String!, $date: String!, $tagIds: [ID!]) {
    createEvent(title: $title, date: $date, tagIds: $tagIds) {
      id
      title
      date
    }
  }
`;

export const ADD_ATTENDEE = gql`
  mutation AddAttendee($eventId: ID!, $name: String!, $email: String) {
    addAttendee(eventId: $eventId, name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

export const REMOVE_ATTENDEE = gql`
  mutation RemoveAttendee($eventId: ID!, $attendeeId: ID!) {
    removeAttendee(eventId: $eventId, attendeeId: $attendeeId)
  }
`;
