import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginButtonWithGoogle } from '../../../components/Form/LoginButtonWithGoogle';
import { mocked } from 'jest-mock';
import { useRouter } from 'next/router';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

jest.mock('../../../services/firebase', () => {
  return {
    auth: 'fake-auth',
  };
});

jest.mock('next/router');

const useRouterMocked = mocked(useRouter);
const pushMock = jest.fn();

useRouterMocked.mockReturnValue({
  push: pushMock,
} as any);

jest.mock('firebase/auth');
const signInWithPopupMocked = mocked(signInWithPopup);
mocked(GoogleAuthProvider);

signInWithPopupMocked.mockResolvedValue({
  user: 'fake-user',
} as any);

describe('LoginButtonWithGoogle component', () => {
  beforeEach(() => {
    render(<LoginButtonWithGoogle />);
  });

  it('renders correctly', () => {
    expect(screen.getByText('Entrar com o Google')).toBeInTheDocument();
  });

  it('redirects to the conversations page if the user is logged in', async () => {
    const loginButtonWithGoogle = screen.getByText('Entrar com o Google');

    fireEvent.click(loginButtonWithGoogle);

    await waitFor(() => expect(pushMock).toHaveBeenCalledWith('/conversas'));
  });

  it('fire console.error if function handleSignInWithGoogle falls into catch', async () => {
    // eslint-disable-next-line no-console
    console.error = jest.fn();

    const loginButtonWithGoogle = screen.getByText('Entrar com o Google');

    fireEvent.click(loginButtonWithGoogle);

    // eslint-disable-next-line no-console
    await waitFor(() => expect(console.error).toHaveBeenCalled());
  });

  it('fire error toast if function handleSignInWithGoogle falls into catch', async () => {
    signInWithPopupMocked.mockImplementationOnce(() => {
      throw new Error('fake-error');
    });

    const loginButtonWithGoogle = screen.getByText('Entrar com o Google');

    fireEvent.click(loginButtonWithGoogle);

    expect(
      screen.getAllByText('Ocorreu um erro desconhecido')[0]
    ).toBeInTheDocument();
  });
});
