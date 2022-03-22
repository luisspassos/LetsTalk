import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../../pages/index';
import { AuthContext } from '../../contexts/AuthContext';
import { act } from 'react-dom/test-utils';
import { useRouter } from 'next/router';
import { mocked } from 'jest-mock';

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
      target: { value: 'email@gmail.com' },
    });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    await act(async () => {
      fireEvent.click(loginButton);
    });

    screen.debug();

    expect(screen.getByText('Este usuário não existe')).toBeInTheDocument();
  });
});
