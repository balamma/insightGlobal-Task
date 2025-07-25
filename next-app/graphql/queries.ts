import { DocumentNode, gql } from '@apollo/client';

export const GET_EVENTS = gql`
  query GetEvents {
    events {
      id
      title
      date
      attendees {
        id
        name
        email
      }

    }
  }
`;

export const GET_EVENT_BY_ID = gql`
  query GetEventById($id: ID!) {
    event(id: $id) {
      id
      title
      date
      attendeeCount
      attendees {
        id
        name
        email
      }
    }
  }
`;

export const CREATE_EVENT = gql`
  mutation CreateEvent($title: String!, $date: String!, $tagIds: [ID!]) {
  createEvent(title: $title, date: $date, tagIds: $tagIds) {
    id
    title
    date
    attendees {
      id
      name
    }
  }
}
`;


 