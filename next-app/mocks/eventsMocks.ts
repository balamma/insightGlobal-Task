// next-app/mocks/eventsMocks.ts
import { MockedResponse } from '@apollo/client/testing';
import { GET_EVENTS } from '../graphql/queries';

export const eventsMocks: MockedResponse[] = [
  {
    request: {
      query: GET_EVENTS,
    },
    result: {
      data: {
        events: [
          {
            id: '1',
            title: 'Mocked Event 1',
            date: '2025-08-01',
            attendees: [{ id: 'a1' }, { id: 'a2' }],
          },
          {
            id: '2',
            title: 'Mocked Event 2',
            date: '2025-08-05',
            attendees: [{ id: 'a3' }],
          },
        ],
      },
    },
  },
];
