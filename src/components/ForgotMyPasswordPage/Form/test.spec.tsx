import { render, screen, fireEvent } from '@testing-library/react';
import IForgotMyPassword from 'pages/esqueci-minha-senha';
import { act } from 'react-dom/test-utils';
import { FirebaseError } from 'firebase/app';
import { get } from 'tests/test_utils/esqueci-minha-senha/getComponents';
import { mocked } from 'jest-mock';
import { sendEmailToRecoverPassword } from 'contexts/AuthContext';
import { fakeAuth } from 'tests/test_utils/fakeAuth';

fakeAuth();

jest.mock('contexts/AuthContext');

const sendEmailToRecoverPasswordMocked = mocked(sendEmailToRecoverPassword);

async function fillInInputAndPressTheButton({
  email = 'email@gmail.com',
} = {}) {
  const sendButton = get.sendButton();
  const emailInput = get.emailInput();

  fireEvent.change(emailInput, {
    target: { value: email },
  });

  await act(async () => {
    fireEvent.click(sendButton);
  });
}

describe('Forgot my password form', () => {
  beforeEach(() => {
    render(<IForgotMyPassword />);
  });

  describe('Email', () => {
    const errors = [
      {
        title: 'should be required',
        emailValue: '',
        errorMessage: 'E-mail obrigatório',
      },
      {
        title: 'should be valid',
        emailValue: 'email',
        errorMessage: 'E-mail inválido',
      },
    ];

    for (const { emailValue, errorMessage, title } of errors) {
      it(title, async () => {
        await fillInInputAndPressTheButton({ email: emailValue });

        expect(screen.getByText(errorMessage)).toBeInTheDocument();
      });
    }

    it('must run .trim() on email', async () => {
      await fillInInputAndPressTheButton({ email: ' email@gmail.com      ' });

      expect(sendEmailToRecoverPassword).toHaveBeenCalledWith({
        email: 'email@gmail.com',
      });
    });

    it('should issue a success toast if the email was sent', async () => {
      await fillInInputAndPressTheButton();

      expect(screen.getAllByText('Email enviado')[0]).toBeInTheDocument();
    });
  });

  describe('errors', () => {
    it.each`
      error_code                  | test_message
      ${'auth/user-not-found'}    | ${'Este usuário não existe'}
      ${'auth/too-many-requests'} | ${'Tente novamente mais tarde'}
      ${'unknown error'}          | ${'Ocorreu um erro desconhecido. Tente novamente'}
    `(
      'throws a error toast if it is $error_code',
      async ({ error_code, test_message }) => {
        sendEmailToRecoverPasswordMocked.mockImplementationOnce(() => {
          throw new FirebaseError(error_code, 'error-message');
        });

        await fillInInputAndPressTheButton();

        expect(screen.getByText(test_message)).toBeInTheDocument();
      }
    );
  });
});
