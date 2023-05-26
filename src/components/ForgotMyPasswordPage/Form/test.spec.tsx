import { Form } from '.';
import { testFormWithEmail } from 'tests/utils/testFormWithEmail';
import { sendEmailToRecoverPassword } from 'contexts/AuthContext';
import { userNotFound } from 'tests/utils/testFormWithEmail/testFirebaseError/tests/userNotFound';
import { tooManyRequests } from 'tests/utils/testFormWithEmail/testFirebaseError/tests/tooManyRequests';

jest.mock('contexts/AuthContext');

testFormWithEmail({
  name: 'Forgot my password',
  Component: Form,
  formInfo: { buttonName: 'ENVIAR' },
  funcToBeMocked: sendEmailToRecoverPassword,
  tests: {
    email: ({ testFirebaseError }) => {
      userNotFound({ testFirebaseError });
      tooManyRequests({ testFirebaseError });
    },
  },
});
