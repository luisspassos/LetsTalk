import { Form } from '.';
import { testFormWithEmail } from 'tests/utils/testFormWithEmail';
import { sendEmailToRecoverPassword } from 'contexts/AuthContext';

jest.mock('contexts/AuthContext');

testFormWithEmail({
  name: 'Forgot my password',
  Component: Form,
  formInfo: { buttonName: 'ENVIAR' },
  funcToBeMocked: sendEmailToRecoverPassword,
  tests: {
    email: ({ testFirebaseError }) => {
      // eslint-disable-next-line jest/expect-expect
      it('should show an error message if the user is not found', async () => {
        await testFirebaseError({
          errorCode: 'auth/user-not-found',
          expectedText: 'Este usuário não existe',
        });
      });

      // eslint-disable-next-line jest/expect-expect
      it('should should show an error message if there are too many requests', async () => {
        await testFirebaseError({
          errorCode: 'auth/too-many-requests',
          expectedText: 'Tente novamente mais tarde',
        });
      });
    },
  },
});
