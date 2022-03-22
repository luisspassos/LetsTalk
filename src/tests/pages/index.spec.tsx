import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../../pages/index';
import { AuthContext } from '../../contexts/AuthContext';
import { act } from 'react-dom/test-utils';
import { useRouter } from 'next/router';
import { mocked } from 'jest-mock';
import { FirebaseError } from 'firebase/app';

jest.mock('next/router');

describe('Login page', () => {
  it('renders correctly', () => {
    render(<Login />);

    expect(screen.getByText('Entrar com o Google')).toBeInTheDocument();
  });

  it('check if function signInWithEmailAndPassword is running if inputs are filled in correctly', async () => {
    const signInWithEmailAndPassword = jest.fn();

    render(
      <AuthContext.Provider value={{ signInWithEmailAndPassword }}>
        <Login />
      </AuthContext.Provider>
    );

    const loginButton = screen.getByText('ENTRAR');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Senha');

    fireEvent.change(emailInput, { target: { value: 'email@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    await act(async () => {
      fireEvent.click(loginButton);
    });

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith({
      email: 'email@gmail.com',
      password: 'password',
    });
  });

  it('show empty input error messages', async () => {
    render(<Login />);

    const loginButton = screen.getByText('ENTRAR');

    await act(async () => {
      fireEvent.click(loginButton);
    });

    expect(screen.getByText('E-mail obrigatório')).toBeInTheDocument();
    expect(screen.getByText('Senha obrigatória')).toBeInTheDocument();
  });

  it('should show invalid email message if it is', async () => {
    render(<Login />);

    const loginButton = screen.getByText('ENTRAR');
    const emailInput = screen.getByLabelText('Email');

    fireEvent.change(emailInput, { target: { value: 'email' } });

    await act(async () => {
      fireEvent.click(loginButton);
    });

    expect(screen.getByText('E-mail inválido')).toBeInTheDocument();
  });

  it('should redirect user to login page if he is logged in', async () => {
    const useRouterMocked = mocked(useRouter);
    const pushMock = jest.fn();

    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any);

    const signInWithEmailAndPassword = jest.fn().mockReturnValue({
      user: 'fake-user',
    });

    render(
      <AuthContext.Provider value={{ signInWithEmailAndPassword }}>
        <Login />
      </AuthContext.Provider>
    );

    const loginButton = screen.getByText('ENTRAR');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Senha');

    fireEvent.change(emailInput, { target: { value: 'email@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    await act(async () => {
      fireEvent.click(loginButton);
    });

    expect(pushMock).toHaveBeenCalledWith('/conversas');
  });

  it('must run .trim() on email', async () => {
    const signInWithEmailAndPassword = jest.fn();

    render(
      <AuthContext.Provider value={{ signInWithEmailAndPassword }}>
        <Login />
      </AuthContext.Provider>
    );

    const loginButton = screen.getByText('ENTRAR');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Senha');

    fireEvent.change(emailInput, {
      target: { value: '   email@gmail.com   ' },
    });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    await act(async () => {
      fireEvent.click(loginButton);
    });

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith({
      email: 'email@gmail.com',
      password: 'password',
    });
  });

  it('trigger error message if user not found', async () => {
    const signInWithEmailAndPassword = jest.fn(() => {
      throw new FirebaseError('auth/user-not-found', 'error-message');
    });

    render(
      <AuthContext.Provider value={{ signInWithEmailAndPassword }}>
        <Login />
      </AuthContext.Provider>
    );

    const loginButton = screen.getByText('ENTRAR');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Senha');

    fireEvent.change(emailInput, {
      target: { value: 'email@gmail.com' },
    });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    await act(async () => {
      fireEvent.click(loginButton);
    });

    expect(
      await screen.findByText('Este usuário não existe')
    ).toBeInTheDocument();
  });

  it('trigger error if password is wrong', async () => {
    const signInWithEmailAndPassword = jest.fn(() => {
      throw new FirebaseError('auth/wrong-password', 'error-message');
    });

    render(
      <AuthContext.Provider value={{ signInWithEmailAndPassword }}>
        <Login />
      </AuthContext.Provider>
    );

    const loginButton = screen.getByText('ENTRAR');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Senha');

    fireEvent.change(emailInput, {
      target: { value: 'email@gmail.com' },
    });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    await act(async () => {
      fireEvent.click(loginButton);
    });

    expect(await screen.findByText('Senha incorreta')).toBeInTheDocument();
  });

  it('there should be a forgot-my-password link to take you to the "esqueci-minha-senha" route', () => {
    render(<Login />);

    const forgotMyPasswordLink = screen.getByText('Esqueci minha senha');
    expect(forgotMyPasswordLink.closest('a')).toHaveAttribute(
      'href',
      '/esqueci-minha-senha'
    );
  });

  it('the enter button should render a spinner when clicking it', async () => {
    const signInWithEmailAndPassword = jest.fn(
      () => new Promise((res) => setTimeout(res, 100))
    );

    render(
      <AuthContext.Provider value={{ signInWithEmailAndPassword } as any}>
        <Login />
      </AuthContext.Provider>
    );

    const loginButton = screen.getByText('ENTRAR');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Senha');

    fireEvent.change(emailInput, { target: { value: 'email@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    await act(async () => {
      fireEvent.click(loginButton);
    });

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
