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

function pressTheButton() {
  const loginButtonWithGoogle = screen.getByText('Entrar com o Google');

  fireEvent.click(loginButtonWithGoogle);
}

describe('LoginButtonWithGoogle component', () => {
  beforeEach(() => {
    render(<LoginButtonWithGoogle />);
  });

  it('renders correctly', () => {
    expect(screen.getByText('Entrar com o Google')).toBeInTheDocument();
  });

  it('redirects to the conversations page if the user is logged in', async () => {
    pressTheButton();

    await waitFor(() => expect(pushMock).toHaveBeenCalledWith('/conversas'));
  });

  it('fire error toast if function handleSignInWithGoogle falls into catch', async () => {
    signInWithPopupMocked.mockImplementationOnce(() => {
      throw new Error('fake-error');
    });

    pressTheButton();

    expect(
      await screen.findByText('Ocorreu um erro desconhecido')
    ).toBeInTheDocument();
  });
});
