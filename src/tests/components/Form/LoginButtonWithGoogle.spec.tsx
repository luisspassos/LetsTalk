import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginButtonWithGoogle } from '../../../components/Form/LoginButtonWithGoogle';
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
    // eslint-disable-next-line no-console
    console.error = jest.fn();

    render(<LoginButtonWithGoogle />);

    const loginButtonWithGoogle = screen.getByText('Entrar com o Google');

    fireEvent.click(loginButtonWithGoogle);

    // eslint-disable-next-line no-console
    await waitFor(() => expect(console.error).toHaveBeenCalled());
  });

  it('fire error toast if function handleSignInWithGoogle falls into catch', async () => {
    signInWithPopupMocked.mockImplementationOnce(() => {
      throw new Error('fake-error');
    });

    render(<LoginButtonWithGoogle />);

    const loginButtonWithGoogle = screen.getByText('Entrar com o Google');

    fireEvent.click(loginButtonWithGoogle);

    expect(
      screen.getByText('Ocorreu um erro desconhecido')
    ).toBeInTheDocument();
  });
});
