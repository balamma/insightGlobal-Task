'use client';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { CREATE_EVENT } from '../../../graphql/mutations';
import { GET_EVENTS } from '../../../graphql/queries';

export default function NewEventPage() {
  const router = useRouter();
  const [createEvent] = useMutation(CREATE_EVENT);

  return (

    
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Create Event</h1>

      <Formik
        initialValues={{ title: '', date: '' }}
        validationSchema={Yup.object({
          title: Yup.string().required('Required'),
          date: Yup.string().required('Required'),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await createEvent({
              variables: {
                title: values.title,
                date: values.date,
                //tagIds: [], // Optional: must match your backend typeDefs
              },
              refetchQueries: [{ query: GET_EVENTS }],
            });
            router.push('/events');
            console.log("create new event")
          } catch (err) {
            console.error('Mutation error:', err);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        <Form className="space-y-4">
          <div>
            <label className="block">Title</label>
            <Field name="title" className="border p-2 w-full" />
            <ErrorMessage name="title" component="div" className="text-red-500" />
          </div>

          <div>
            <label className="block">Date</label>
            <Field name="date" type="date" className="border p-2 w-full" />
            <ErrorMessage name="date" component="div" className="text-red-500" />
          </div>

          <button type="submit" className="bg-blue-600 text-white p-2 rounded">
            Create Event form
          </button>
        </Form>
      </Formik>
    </div>
  );
}
