import { sendEmailToRecoverPassword } from 'contexts/AuthContext';
import { Form } from '.';
import { testForm, throwFirebaseError } from 'tests/utils/testForm';

jest.mock('contexts/AuthContext');

testForm({
  name: 'Forgot my password form',
  Component: Form,
  submitButtonName: 'ENVIAR',
  mockImplementation: {
    funcToBeMocked: sendEmailToRecoverPassword,
    tests: [
      {
        title: 'should show an error message if there are too many requests',
        errorMessage: 'Tente novamente mais tarde',
        implementation: () => {
          throwFirebaseError('auth/too-many-requests');
        },
      },
    ],
  },
});
