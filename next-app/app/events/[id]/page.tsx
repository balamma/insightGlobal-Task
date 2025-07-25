'use client';
import { useQuery } from '@apollo/client';
import { GET_EVENT_BY_ID } from '../../../graphql/queries';
import { useParams } from 'next/navigation';
import AttendeeList from '../../../components/AttendeeList';
import AddAttendeeForm from '../../../components/AddAttendeeForm';
import EventList from '../../../components/EventList';

export default function EventDetailsPage() {
  const { id } = useParams();
  const { data, loading, error, refetch } = useQuery(GET_EVENT_BY_ID, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading event</p>;

  const { event } = data;

  return (
    <div>
      <h1 className="text-2xl font-bold">{event.title}</h1>
      <p className="text-gray-600">Date: {new Date(event.date).toDateString()}</p>
      <p className="mt-2">Attendee Count: {event.attendeeCount}</p>
      <h2 className="mt-6 text-xl font-semibold">Attendees</h2>
      <AttendeeList attendees={event.attendees} eventId={event.id} onChange={refetch} />
      <h2 className="mt-6 text-xl font-semibold">Add Attendee</h2>
      <AddAttendeeForm eventId={event.id} onAdd={refetch} />
    </div>
  );
}
