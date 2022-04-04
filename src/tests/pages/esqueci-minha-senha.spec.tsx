import { render, screen, fireEvent } from '@testing-library/react';
import IForgotMyPassword from '../../pages/esqueci-minha-senha';
import { AuthContext } from '../../contexts/AuthContext';
import { act } from 'react-dom/test-utils';
import { FirebaseError } from 'firebase/app';
import { spinnerTimeout } from '../test_utils/spinnerTimeout';

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        components: {},
      };
    },
  };
});

jest.mock('../../services/firebase', () => {
  return {
    auth: 'fake-auth',
  };
});

const sendEmailToRecoverPassword = jest.fn();

async function fillInInputAndPressTheButton({
  email = 'email@gmail.com',
} = {}) {
  const sendButton = screen.getByText('ENVIAR');
  const emailInput = screen.getByLabelText('Email');

  fireEvent.change(emailInput, {
    target: { value: email },
  });

  await act(async () => {
    fireEvent.click(sendButton);
  });
}

describe('IForgotMyPassword page', () => {
  beforeEach(() => {
    render(
      <AuthContext.Provider value={{ sendEmailToRecoverPassword } as any}>
        <IForgotMyPassword />
      </AuthContext.Provider>
    );
  });

  it('renders correctly', () => {
    expect(
      screen.getByText('Envie seu email para recuperar sua senha')
    ).toBeInTheDocument();
  });

  const invalidEmailMessages = [
    {
      test_title:
        'there must be a mandatory email message if it is not entered',
      email: '',
      message: 'E-mail obrigatório',
    },
    {
      test_title: 'should display an invalid email message',
      email: 'email',
      message: 'E-mail inválido',
    },
  ];

  invalidEmailMessages.forEach(({ email, message, test_title }) => {
    // eslint-disable-next-line jest/valid-title
    it(test_title, async () => {
      await fillInInputAndPressTheButton({ email });

      expect(screen.getByText(message)).toBeInTheDocument();
    });
  });

  it('must run .trim() on email', async () => {
    await fillInInputAndPressTheButton({ email: ' email@gmail.com      ' });

    expect(sendEmailToRecoverPassword).toHaveBeenCalledWith({
      email: 'email@gmail.com',
    });
  });

  it('should issue a success toast if the email was sent', async () => {
    sendEmailToRecoverPassword.mockResolvedValueOnce('fake-return');

    await fillInInputAndPressTheButton();

    expect(screen.getAllByText('Email enviado')[0]).toBeInTheDocument();
  });

  it.each`
    error_code                  | test_message
    ${'auth/user-not-found'}    | ${'Este usuário não existe'}
    ${'auth/too-many-requests'} | ${'Tente novamente mais tarde'}
    ${'unknown error'}          | ${'Ocorreu um erro desconhecido'}
  `(
    'throws an error if it is $error_code',
    async ({ error_code, test_message }) => {
      sendEmailToRecoverPassword.mockImplementationOnce(() => {
        throw new FirebaseError(error_code, 'error-message');
      });

      await fillInInputAndPressTheButton();

      expect(screen.getByText(test_message)).toBeInTheDocument();
    }
  );

  it('the enter button should render a spinner when clicking it', async () => {
    sendEmailToRecoverPassword.mockImplementationOnce(spinnerTimeout);

    await fillInInputAndPressTheButton();

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
