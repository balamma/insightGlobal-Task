'use client';

import { useMutation } from '@apollo/client';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { CREATE_EVENT } from '../graphql/mutations';
import { useRouter } from 'next/navigation';
 
 

export default function EventForm() {
  const [createEvent, { data, loading, error }] = useMutation(CREATE_EVENT);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Create New Event</h2>
      <Formik
        initialValues={{ name: '', date: '' }}
        onSubmit={async (values, { resetForm }) => {
          try {
            await createEvent({
              variables: {
                name: values.name,
                date: values.date,
              },
            });
            resetForm();
          } catch (err) {
            console.error('Error creating event:', err);
          }
        }}
      >
        <Form className="space-y-4">
          <div>
            <label>Name:</label>
            <Field name="name" type="text" className="border p-2 rounded w-full" />
          </div>
          <div>
            <label>Date:</label>
            <Field name="date" type="date" className="border p-2 rounded w-full" />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Create Event
          </button>
        </Form>
      </Formik>

      {loading && <p>Creating event...</p>}
      {error && <p className="text-red-600">Error: {error.message}</p>}
      {data && <p className="text-green-600">Event created: {data.createEvent.name}</p>}
    </div>
  );
}
