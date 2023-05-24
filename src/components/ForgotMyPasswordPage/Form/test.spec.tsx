import { Form } from '.';
import { testFormWithEmail } from 'tests/utils/testFormWithEmail';
import { mocked } from 'jest-mock';
import { sendEmailToRecoverPassword } from 'contexts/AuthContext';
import {
  ReducedParams,
  testFirebaseError,
} from 'tests/utils/testFormWithEmail/testFirebaseError';
import { createFillOutFormAndPressTheButton } from 'tests/utils/testFormWithEmail/createFillOutFormAndPressTheButton';

jest.mock('contexts/AuthContext');

const sendEmailToRecoverPasswordMocked = mocked(sendEmailToRecoverPassword);

// type FillOutFormAndPressTheButtonParams = {
//   email: string;
// };

// async function fillOutFormAndPressTheButton(
//   params?: FillOutFormAndPressTheButtonParams
// ) {
//   const emailInput = screen.getByLabelText('Email');
//   const sendButton = getButton('ENVIAR');

//   typeInEmailInput({
//     input: emailInput,
//     text: params?.email,
//   });

//   await clickButton(sendButton);
// }

const fillOutFormAndPressTheButton = createFillOutFormAndPressTheButton();

async function newTestFirebaseError(rest: ReducedParams) {
  await testFirebaseError({
    mockedFunc: sendEmailToRecoverPasswordMocked,
    fillOutFormAndPressTheButton,
    ...rest,
  });
}

testFormWithEmail({
  name: 'Forgot my password form',
  Component: Form,
  fillOutFormAndPressTheButton,
  mockedFunc: sendEmailToRecoverPasswordMocked,
  tests: {
    email: () => {
      // eslint-disable-next-line jest/expect-expect
      it('should show an error message if the user is not found', async () => {
        await newTestFirebaseError({
          errorCode: 'auth/user-not-found',
          expectedText: 'Este usuário não existe',
        });
      });

      // eslint-disable-next-line jest/expect-expect
      it('should should show an error message if there are too many requests', async () => {
        await newTestFirebaseError({
          errorCode: 'auth/too-many-requests',
          expectedText: 'Tente novamente mais tarde',
        });
      });
    },
  },
});
