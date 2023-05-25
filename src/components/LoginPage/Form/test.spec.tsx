import { Form } from '.';
import { testFormWithEmail } from 'tests/utils/testFormWithEmail';
import { signInWithEmailAndPassword } from 'firebase/auth';

jest.mock('contexts/AuthContext');

testFormWithEmail({
  name: 'Login',
  Component: Form,
  formInfo: {
    buttonName: 'ENTRAR',
    inputs: [{ label: 'Senha', defaultValue: '123456' }],
  },
  funcToBeMocked: signInWithEmailAndPassword,
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
    others: ({ fillOutFormAndPressTheButton }) => {
      describe('Password', () => {
        it('should be required', async () => {
          await fillOutFormAndPressTheButton({});
        });
      });
    },
  },
});
