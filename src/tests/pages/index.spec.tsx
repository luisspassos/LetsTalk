import { render, screen, fireEvent } from '@testing-library/react';
import Login, { getServerSideProps } from '../../pages/index';
import { AuthContext } from '../../contexts/AuthContext';
import { act } from 'react-dom/test-utils';
import { mocked } from 'jest-mock';
import { FirebaseError } from 'firebase/app';
import { useRouter } from 'next/router';
import { spinnerTimeout } from '../utils/spinnerTimeout';
import { applyActionCode, sendEmailVerification } from 'firebase/auth';

jest.mock('firebase/auth');

const applyActionCodeMocked = mocked(applyActionCode);

jest.mock('next/router');
jest.mock('../../services/firebase', () => {
  return {
    auth: {
      currentUser: 'fake-user',
    },
  };
});

const useRouterMocked = mocked(useRouter);
const pushMock = jest.fn();
const replaceRouterMock = jest.fn();

useRouterMocked.mockReturnValue({
  push: pushMock,
  query: { error: undefined },
  replace: replaceRouterMock,
} as any);

describe('Login page', () => {
  it('renders correctly', () => {
    render(<Login mode='fake-mode' actionCode='fake-actionCode' />);

    expect(screen.getByText('Entrar com o Google')).toBeInTheDocument();
  });

  it('check if function signInWithEmailAndPassword is running if inputs are filled in correctly', async () => {
    const signInWithEmailAndPassword = jest.fn();

    render(
      <AuthContext.Provider value={{ signInWithEmailAndPassword } as any}>
        <Login mode='' actionCode='fake-actionCode' />
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
    render(<Login mode='' actionCode='fake-actionCode' />);

    const loginButton = screen.getByText('ENTRAR');

    await act(async () => {
      fireEvent.click(loginButton);
    });

    expect(screen.getByText('E-mail obrigatório')).toBeInTheDocument();
    expect(screen.getByText('Senha obrigatória')).toBeInTheDocument();
  });

  it('should show invalid email message if it is', async () => {
    render(<Login mode='' actionCode='fake-actionCode' />);

    const loginButton = screen.getByText('ENTRAR');
    const emailInput = screen.getByLabelText('Email');

    fireEvent.change(emailInput, { target: { value: 'email' } });

    await act(async () => {
      fireEvent.click(loginButton);
    });

    expect(screen.getByText('E-mail inválido')).toBeInTheDocument();
  });

  it('should redirect user to login page if he is logged in', async () => {
    const signInWithEmailAndPassword = jest.fn().mockReturnValueOnce({
      user: {
        emailVerified: true,
      },
    });

    render(
      <AuthContext.Provider value={{ signInWithEmailAndPassword } as any}>
        <Login mode='' actionCode='fake-actionCode' />
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
      <AuthContext.Provider value={{ signInWithEmailAndPassword } as any}>
        <Login mode='' actionCode='fake-actionCode' />
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
      <AuthContext.Provider value={{ signInWithEmailAndPassword } as any}>
        <Login mode='' actionCode='fake-actionCode' />
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
      <AuthContext.Provider value={{ signInWithEmailAndPassword } as any}>
        <Login mode='' actionCode='fake-actionCode' />
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
    render(<Login mode='' actionCode='fake-actionCode' />);

    const forgotMyPasswordLink = screen.getByText('Esqueci minha senha');
    expect(forgotMyPasswordLink.closest('a')).toHaveAttribute(
      'href',
      '/esqueci-minha-senha'
    );
  });

  it('the enter button should render a spinner when clicking it', async () => {
    const signInWithEmailAndPassword = jest.fn(spinnerTimeout);

    render(
      <AuthContext.Provider value={{ signInWithEmailAndPassword } as any}>
        <Login mode='' actionCode='fake-actionCode' />
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

  it('fire error toast if function handleSignInWithGoogle falls into catch', async () => {
    const signInWithEmailAndPassword = jest.fn(() => {
      throw new FirebaseError('unknown-error', 'unknown-error');
    });

    render(
      <AuthContext.Provider value={{ signInWithEmailAndPassword } as any}>
        <Login mode='' actionCode='fake-actionCode' />
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

    expect(
      screen.getByText('Ocorreu um erro desconhecido')
    ).toBeInTheDocument();
  });

  it('should throw an error toast if there is password reset error in the url', () => {
    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
      query: { error: 'passwordreset' },
      replace: replaceRouterMock,
    } as any);

    render(<Login mode='' actionCode='fake-actionCode' />);

    expect(
      screen.getByText(
        'Ocorreu um erro ao validar o código de redefinição de senha'
      )
    ).toBeInTheDocument();
  });

  it('must clear the url if there is an error or success parameter in it', () => {
    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
      query: { error: 'fake-error' },
      replace: replaceRouterMock,
    } as any);

    render(<Login mode='' actionCode='fake-actionCode' />);

    expect(replaceRouterMock).toHaveBeenCalledWith('/');
  });

  it('should throw an success toast if there is password reset success in the url', () => {
    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
      query: { success: 'passwordreset' },
      replace: replaceRouterMock,
    } as any);

    render(<Login mode='' actionCode='fake-actionCode' />);

    expect(
      screen.getByText('Senha atualizada com sucesso')
    ).toBeInTheDocument();
  });

  it('should throw an error toast if there is a password reset error in the url', () => {
    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
      query: { error: 'passwordreset' },
      replace: replaceRouterMock,
    } as any);

    render(<Login mode='' actionCode='fake-actionCode' />);

    expect(
      screen.getAllByText(
        'Ocorreu um erro ao validar o código de redefinição de senha'
      )[0]
    ).toBeInTheDocument();
  });

  it('should trigger an error toast if there is an email verification', async () => {
    applyActionCodeMocked.mockImplementationOnce(() => {
      throw new Error('fake-error');
    });

    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
      query: { mode: 'verifyEmail' },
      replace: replaceRouterMock,
    } as any);

    render(<Login mode='verifyEmail' actionCode='fake-actionCode' />);

    expect(
      screen.getByText('Ocorreu um erro ao verificar o email')
    ).toBeInTheDocument();
  });

  it('should trigger an success toast if there is an email verification', async () => {
    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
      query: { mode: 'verifyEmail' },
      replace: replaceRouterMock,
    } as any);

    render(<Login mode='verifyEmail' actionCode='fake-actionCode' />);

    expect(
      await screen.findByText('Email verificado com sucesso')
    ).toBeInTheDocument();
  });

  it('should trigger a warning message if the email has not yet been verified', async () => {
    const signInWithEmailAndPassword = jest.fn().mockReturnValueOnce({
      user: {
        emailVerified: false,
      },
    });

    render(
      <AuthContext.Provider value={{ signInWithEmailAndPassword } as any}>
        <Login mode='' actionCode='fake-actionCode' />
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

    expect(sendEmailVerification).toHaveBeenCalledWith('fake-user');
    expect(
      screen.getByText('Seu email não foi verificado!')
    ).toBeInTheDocument();
  });

  it('must clear the url if there is an error parameter in the url', () => {
    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
      query: { error: 'fake-error' },
      replace: replaceRouterMock,
    } as any);

    render(<Login mode='verifyEmail' actionCode='fake-actionCode' />);

    expect(replaceRouterMock).toHaveBeenCalledWith('/');
  });

  it('must clear the url if there is an success parameter in the url', () => {
    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
      query: { success: 'fake-success' },
      replace: replaceRouterMock,
    } as any);

    render(<Login mode='verifyEmail' actionCode='fake-actionCode' />);

    expect(replaceRouterMock).toHaveBeenCalledWith('/');
  });

  it('must clear the url if there is an mode parameter in the url', () => {
    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
      query: { mode: 'fake-mode' },
      replace: replaceRouterMock,
    } as any);

    render(<Login mode='verifyEmail' actionCode='fake-actionCode' />);

    expect(replaceRouterMock).toHaveBeenCalledWith('/');
  });

  it('must redirect the user to the page to change the password if there is the resetPassword parameter in the url', async () => {
    const result = await getServerSideProps({
      query: {
        mode: 'resetPassword',
        oobCode: 'fake-oobCode',
      },
    } as any);

    expect(result).toEqual({
      redirect: {
        destination: `/trocar-senha/?oobCode=fake-oobCode`,
        permanent: false,
      },
    });
  });

  it('getServerSideProps should return mode and actionCode', async () => {
    const result = await getServerSideProps({
      query: {
        mode: 'fake-mode',
        oobCode: 'fake-oobCode',
      },
    } as any);

    expect(result).toEqual({
      props: {
        mode: 'fake-mode',
        actionCode: 'fake-oobCode',
      },
    });
  });

  it('mode in getServerSideProps should return null if its original value is undefined', async () => {
    const result = await getServerSideProps({
      query: {
        mode: undefined,
        oobCode: 'fake-oobCode',
      },
    } as any);

    expect(result).toEqual({
      props: {
        mode: null,
        actionCode: 'fake-oobCode',
      },
    });
  });

  it('actionCode in getServerSideProps should return null if its original value is undefined', async () => {
    const result = await getServerSideProps({
      query: {
        mode: 'fake-mode',
        oobCode: undefined,
      },
    } as any);

    expect(result).toEqual({
      props: {
        mode: 'fake-mode',
        actionCode: null,
      },
    });
  });
});
