import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginButtonWithGoogle } from '.';
import { mocked } from 'jest-mock';
import { useRouter } from 'next/router';
import { signInWithPopup } from 'firebase/auth';

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

    await waitFor(() => expect(pushMock).toHaveBeenCalledWith('/conversas'));
  });

  it('fire console.error if function handleSignInWithGoogle falls into catch', async () => {
    console.error = jest.fn();

    render(<LoginButtonWithGoogle />);

    const loginButtonWithGoogle = screen.getByText('Entrar com o Google');

    fireEvent.click(loginButtonWithGoogle);

    await waitFor(() => expect(console.error).toHaveBeenCalled());
  });
});
