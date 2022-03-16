import { render, screen, fireEvent } from '@testing-library/react';
import { LoginButtonWithGoogle } from '.';
import firebaseAuth from 'firebase/auth';
import { mocked } from 'jest-mock';
import { useRouter } from 'next/router';

jest.mock('next/router');

jest.mock('../../../services/firebase', () => {
  const auth = {
    name: '[DEFAULT]',
  };

  return { auth };
});

jest.mock('firebase/auth', () => {
  const GoogleAuthProvider = jest.fn();
  const signInWithPopup = jest.fn().mockResolvedValueOnce({
    user: 'fake-user',
  });

  return { GoogleAuthProvider, signInWithPopup };
});

describe('LoginButtonWithGoogle component', () => {
  it('renders correctly', () => {
    render(<LoginButtonWithGoogle />);

    expect(screen.getByText('Entrar com o Google')).toBeInTheDocument();
  });

  it('redirects to the conversations page if the user is logged in', async () => {
    const useRouterMocked = mocked(useRouter);
    const pushMock = jest.fn();

    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any);

    render(<LoginButtonWithGoogle />);

    const loginButtonWithGoogle = screen.getByText('Entrar com o Google');

    fireEvent.click(loginButtonWithGoogle);

    expect(firebaseAuth.GoogleAuthProvider).toBeCalledTimes(1);
    expect(firebaseAuth.signInWithPopup).toBeCalledTimes(1);
    expect(pushMock).toBeCalledWith('/conversas');
  });
});
