# NOTES


---


- In-memory store resets on server restart.
- No form validation beyond `required`; optionally add Zod or Yup.
- No tags UI on frontend (bonus).
- Zustand store omitted (not strictly needed with Apollo cache).
- No Dockerfile, optimistic UI or responsive styling (optional bonus).
- Assumes Apollo caches and refetchQueries handle updates fine.

---

## To run this:

1. Clone or extract the repo.
2. `cd backend && npm install && npm start`
3. `cd frontend && npm install && npm run dev`
4. Visit `http://localhost:3000/events`.

Let me know if you’d like Zod validation, Zustand usage, Dockerfile, or optimistic UI added!
