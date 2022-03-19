import { render, screen, fireEvent } from '@testing-library/react';
import { LoginButtonWithGoogle } from '.';
import { mocked } from 'jest-mock';
import { useRouter } from 'next/router';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../../services/firebase';

jest.mock('next/router');

jest.mock('firebase/auth');
const signInWithPopupMocked = mocked(signInWithPopup);

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

    signInWithPopupMocked.mockImplementationOnce(
      () => ({ user: 'fake-user' } as any)
    );

    render(<LoginButtonWithGoogle />);

    const loginButtonWithGoogle = screen.getByText('Entrar com o Google');

    fireEvent.click(loginButtonWithGoogle);

    await import('firebase/auth');
    await import('../../../services/firebase');
    await signInWithPopup(auth, new GoogleAuthProvider());
    expect(pushMock).toHaveBeenCalledWith('/conversas');
  });

  it('fire console.error if function handleSignInWithGoogle falls into catch', async () => {
    console.error = jest.fn();

    render(<LoginButtonWithGoogle />);

    const loginButtonWithGoogle = screen.getByText('Entrar com o Google');

    fireEvent.click(loginButtonWithGoogle);

    expect.assertions(1);

    await import('firebase/auth');
    await import('../../../services/firebase');
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (err) {
      expect(console.error).toHaveBeenCalled();
    }
  });
});
