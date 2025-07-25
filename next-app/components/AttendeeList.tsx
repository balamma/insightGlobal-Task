import { Attendee } from '../types';
import { useMutation } from '@apollo/client';
import { REMOVE_ATTENDEE } from '../graphql/mutations';

type Props = {
  attendees: Attendee[];
  eventId: string;
  onChange: () => void;
};

export default function AttendeeList({ attendees, eventId, onChange }: Props) {
  const [removeAttendee] = useMutation(REMOVE_ATTENDEE);

  const handleRemove = async (attendeeId: string) => {
    await removeAttendee({ variables: { eventId, attendeeId } });
    onChange();
  };

  if (!attendees.length) return <p className="text-gray-500">No attendees yet.</p>;

  return (
    <ul className="space-y-2 mt-2">
      {attendees.map((attendee) => (
        <li key={attendee.id} className="flex justify-between items-center border-b py-2">
          <div>
            <p>{attendee.name}</p>
            {attendee.email && <p className="text-sm text-gray-500">{attendee.email}</p>}
          </div>
          <button
            onClick={() => handleRemove(attendee.id)}
            className="text-red-600 text-sm underline"
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
}
