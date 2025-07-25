# ENTITIES

## User
- id: string (UUID, unique)
- name: string
- email: string (unique)
- createdAt: Date

> Note: Only one mock user is used in this app. Auth is out of scope.

---

## Event
- id: string (UUID, unique)
- title: string
- date: Date (ISO string)
- createdBy: string (references User.id)
- tags: string[] (e.g., ["Public", "Internal"])
- attendees: Attendee[] (computed by join with RSVP)
- attendeeCount: number (computed)
- createdAt: Date

---

## Attendee
- id: string (UUID, unique)
- name: string
- email: string | null (optional)
- createdAt: Date

> Attendees are NOT Users. Email is optional and used to help identify repeat attendees.

---

## RSVP
- id: string (UUID, unique)
- eventId: string (references Event.id)
- attendeeId: string (references Attendee.id)
- status: string ("Going", "Not Going", "Maybe")

---

## Notes
- RSVP is a join table to allow many-to-many between events and attendees
- Indexes would typically exist on eventId and attendeeId for RSVP performance
- We assume optimistic UI updates are possible in the frontend, though not required here
