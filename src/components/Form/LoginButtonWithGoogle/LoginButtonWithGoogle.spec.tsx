import { render, screen, fireEvent } from '@testing-library/react';
import { LoginButtonWithGoogle } from '.';
import { mocked } from 'jest-mock';
import { useRouter } from 'next/router';
import { auth } from '../../../services/firebase';
import { GoogleAuthProvider } from 'firebase/auth';

jest.mock('next/router');
jest.mock('../../../services/firebase', () => {
  return {
    auth: auth,
  };
});

jest.mock('firebase/auth', () => {
  return {
    signInWithPopup() {
      return {
        user: 'fake-user',
      };
    },
    GoogleAuthProvider: GoogleAuthProvider,
  };
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

    expect(pushMock).toHaveBeenCalledWith('/conversas');
  });
});
