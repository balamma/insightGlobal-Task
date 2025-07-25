'use client';
import { useQuery } from '@apollo/client';
import EventList from '../../components/EventList';
import Link from 'next/link';
import { GET_EVENTS } from '../../graphql/queries';
import { MockedProvider } from '@apollo/client/testing';


import { eventsMocks } from '../../mocks/eventsMocks';
 
function EventsContent() {
  const { loading, error, data, refetch } = useQuery(GET_EVENTS);

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error.message}</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Events</h1>
        <Link href="/events/new" className="bg-blue-600 text-white px-4 py-2 rounded">
          Create Event
        </Link>
      </div>
      <ul className="space-y-3">
        {data.events.map((event: any) => (
          <li key={event.id} className="p-4 border rounded shadow">
            <Link href={`/events/${event.id}`} className="block">
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <p>Date: {event.date}</p>
              <p>Attendees: {event.attendees.length}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function EventsPage() {
  return <EventsContent />;
}