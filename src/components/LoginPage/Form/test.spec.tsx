import { Form } from '.';
import { testFormWithEmail } from 'tests/utils/testFormWithEmail';
import { signInWithEmailAndPassword } from 'contexts/AuthContext';
import { userNotFound } from 'tests/utils/testFormWithEmail/testFirebaseError/tests/userNotFound';
import { formErrorExpect } from 'tests/utils/testFormWithEmail/formErrorExpect';

jest.mock('contexts/AuthContext', () => ({
  ...jest.requireActual('contexts/AuthContext'),
  signInWithEmailAndPassword: jest.fn(),
}));

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
      userNotFound({ testFirebaseError });
    },
    others: ({ fillOutFormAndPressTheButton, testFirebaseError }) => {
      describe('Password', () => {
        // eslint-disable-next-line jest/expect-expect
        it('should be required', async () => {
          await fillOutFormAndPressTheButton({ Senha: '' });

          formErrorExpect('Senha obrigatória');
        });

        // eslint-disable-next-line jest/expect-expect
        it('should be correct', async () => {
          await testFirebaseError({
            errorCode: 'auth/wrong-password',
            expectedText: 'Senha incorreta',
          });
        });
      });
    },
  },
});
