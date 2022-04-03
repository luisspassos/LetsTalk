import { render, screen, fireEvent } from '@testing-library/react';
import Register from '../../pages/cadastro';
import { act } from 'react-dom/test-utils';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../../services/firebase';
import { mocked } from 'jest-mock';
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

jest.mock('firebase/auth');

const createUserWithEmailAndPasswordMocked = mocked(
  createUserWithEmailAndPassword
);
mocked(sendEmailVerification);
mocked(updateProfile);

createUserWithEmailAndPasswordMocked.mockResolvedValue({
  user: 'fake-user',
} as any);

describe('cadastro page', () => {
  beforeEach(() => {
    render(<Register />);
  });

  async function fillInTheInputsAndPressTheButton({
    email = 'johndoe@email.com',
    name = 'johndoe',
    password = 123456,
    confirmPassword = 123456,
  } = {}) {
    const nameInput = screen.getByLabelText('Nome');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Senha');
    const confirmPasswordInput = screen.getByLabelText('Confirmar senha');
    const registerButton = screen.getByText('CADASTRAR');

    fireEvent.change(nameInput, { target: { value: name } });
    fireEvent.change(emailInput, {
      target: { value: email },
    });
    fireEvent.change(passwordInput, { target: { value: password } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: confirmPassword },
    });
    await act(async () => {
      fireEvent.click(registerButton);
    });
  }

  function fireFirebaseErrorWhenRegistering({
    errorCode = 'fake-errorCode',
    errorMessage = 'error-message',
  } = {}) {
    createUserWithEmailAndPasswordMocked.mockImplementationOnce(() => {
      throw new FirebaseError(errorCode, errorMessage);
    });
  }

  it('renders correctly', () => {
    expect(
      screen.getByText('Mais de 200 mil usuários já estão conversando!')
    ).toBeInTheDocument();
  });

  it('name and email must receive .trim()', async () => {
    await fillInTheInputsAndPressTheButton({
      email: 'johndoe@email.com   ',
      name: 'John Doe   ',
    });

    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
      auth,
      'johndoe@email.com',
      '123456'
    );

    expect(updateProfile).toHaveBeenCalledWith('fake-user', {
      displayName: 'John Doe',
    });
  });

  it('should trigger error messages if inputs are empty', async () => {
    const registerButton = screen.getByText('CADASTRAR');

    fireEvent.click(registerButton);

    expect(await screen.findByText('E-mail obrigatório')).toBeInTheDocument();
    expect(await screen.findByText('Nome obrigatório')).toBeInTheDocument();
    expect(await screen.findByText('Senha obrigatória')).toBeInTheDocument();
  });

  it.each`
    message                            | input
    ${'No mínimo 6 caracteres'}        | ${'password'}
    ${'E-mail inválido'}               | ${'email'}
    ${'As senhas precisam ser iguais'} | ${'confirmPassword'}
  `(
    'should trigger an error message if there is any incorrect value in the $input input',
    async ({ message }: { message: string }) => {
      await fillInTheInputsAndPressTheButton({
        email: 'johndoe',
        password: 123,
        confirmPassword: 12,
      });

      expect(screen.getByText(message)).toBeInTheDocument();
    }
  );

  it('must send a verification email after registering', async () => {
    await fillInTheInputsAndPressTheButton();

    expect(sendEmailVerification).toHaveBeenCalledWith('fake-user');
  });

  it('should show a success toast if the user has been registered', async () => {
    await fillInTheInputsAndPressTheButton();

    expect(
      screen.getAllByText('Cadastrado com sucesso')[0]
    ).toBeInTheDocument();
  });

  it('if the email is already being used, it should trigger an error message', async () => {
    fireFirebaseErrorWhenRegistering({
      errorCode: 'auth/email-already-in-use',
    });

    await fillInTheInputsAndPressTheButton();

    expect(
      screen.getByText('Este email já está sendo usado')
    ).toBeInTheDocument();
  });

  it('if the error is unknown when registering, it should trigger a toast', async () => {
    fireFirebaseErrorWhenRegistering();

    await fillInTheInputsAndPressTheButton();

    expect(
      screen.getByText('Ocorreu um erro desconhecido')
    ).toBeInTheDocument();
  });

  it('there must be a link with the text "Fazer login" and with the route "/"', () => {
    const signInLink = screen.getByText('Fazer login');

    expect(signInLink.closest('a')).toHaveAttribute('href', '/');
  });

  it('the register button should render a spinner when clicking it', async () => {
    createUserWithEmailAndPasswordMocked.mockImplementationOnce(
      spinnerTimeout as any
    );

    await fillInTheInputsAndPressTheButton();

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
