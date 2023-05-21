import { act, fireEvent, render, screen } from '@testing-library/react';
import { signInWithEmailAndPassword } from 'contexts/AuthContext';
import { FirebaseError } from 'firebase/app';
import { mocked } from 'jest-mock';
import { testUnknownError } from 'tests/utils/testUnknownError';
import { Form } from '.';

jest.mock('contexts/AuthContext', () => {
  return {
    ...jest.requireActual('contexts/AuthContext'),
    signInWithEmailAndPassword: jest.fn(),
  };
});

const signInWithEmailAndPasswordMocked = mocked(signInWithEmailAndPassword);

describe('Login form', () => {
  beforeEach(() => {
    render(<Form />);
  });

  async function pressButton() {
    const button = screen.getByRole('button', { name: 'ENTRAR' });

    await act(async () => {
      fireEvent.click(button);
    });
  }

  it('email and password should be required', async () => {
    await pressButton();

    expect(screen.getByText('E-mail obrigatório')).toBeVisible();
    expect(screen.getByText('Senha obrigatória')).toBeVisible();
  });

  it('email should be valid', async () => {
    const emailInput = screen.getByLabelText('Email');

    fireEvent.change(emailInput, {
      target: { value: 'email' },
    });

    await pressButton();

    expect(screen.getByText('E-mail inválido')).toBeVisible();
  });

  function a() {
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Senha');

    fireEvent.change(emailInput, {
      target: { value: 'email@gmail.com' },
    });

    fireEvent.change(passwordInput, {
      target: { value: '123456' },
    });
  }

  it('should show an error message if the user was not found', async () => {
    signInWithEmailAndPasswordMocked.mockImplementationOnce(() => {
      throw new FirebaseError('auth/user-not-found', '');
    });

    a();

    await pressButton();

    expect(screen.getByText('Este usuário não existe')).toBeInTheDocument();
  });

  it('should show an error message if the password is incorrect', async () => {
    signInWithEmailAndPasswordMocked.mockImplementationOnce(() => {
      throw new FirebaseError('auth/wrong-password', '');
    });

    a();

    await pressButton();

    expect(screen.getByText('Senha incorreta')).toBeInTheDocument();
  });

  testUnknownError(async () => {
    signInWithEmailAndPasswordMocked.mockImplementationOnce(() => {
      throw 'error';
    });

    a();

    await pressButton();
  });
});
