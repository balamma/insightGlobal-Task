export interface Event {
  id: string;
  title: string;
  date: string;
  attendeeCount: number;
  attendees?: Attendee[];
}

export interface Attendee {
  id: string;
  name: string;
  email?: string | null;
}
