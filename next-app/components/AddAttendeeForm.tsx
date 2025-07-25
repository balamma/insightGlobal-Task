import { useMutation } from '@apollo/client';
import { Formik, Form, Field } from 'formik';
import { ADD_ATTENDEE } from '../graphql/mutations';

type Props = {
  eventId: string;
  onAdd: () => void;
};

export default function AddAttendeeForm({ eventId, onAdd }: Props) {
  const [addAttendee] = useMutation(ADD_ATTENDEE);

  return (
    <Formik
      initialValues={{ name: '', email: '' }}
      validate={(values) => {
        const errors: Record<string, string> = {};
        if (!values.name) errors.name = 'Required';
        return errors;
      }}
      onSubmit={async (values, { resetForm, setSubmitting }) => {
        await addAttendee({ variables: { ...values, eventId } });
        onAdd();
        resetForm();
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className="space-y-4 mt-2">
          <div>
            <label className="block font-medium">Name</label>
            <Field name="name" className="border p-2 w-full rounded" />
            {errors.name && touched.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>
          <div>
            <label className="block font-medium">Email (optional)</label>
            <Field name="email" type="email" className="border p-2 w-full rounded" />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Add Attendee
          </button>
        </Form>
      )}
    </Formik>
  );
}
