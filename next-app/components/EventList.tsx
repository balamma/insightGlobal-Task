import Link from 'next/link';
import { Event } from '../types';

type Props = {
  events: Event[];
};

export default function EventList({ events }: Props) {
  return (
    <ul className="space-y-4">
      {events.map((event) => (
        <li key={event.id} className="border p-4 rounded shadow">
          <Link href={`/events/${event.id}`}>
            <h2 className="text-lg font-semibold">{event.title}</h2>
          </Link>
          <p>Date: {event.date}</p>
          <p>Attendees: {event.attendees?.length || 0}</p>
        </li>
      ))}
    </ul>
  );
}