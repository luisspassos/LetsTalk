import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/router';
import { LoginButtonWithGoogle } from '.';
import { mocked } from 'jest-mock';

jest.mock('next/router');

jest.mock('../../../services/firebase', () => {
  return {
    auth: jest.fn(),
  };
});

jest.mock('firebase/auth', () => {
  return {
    GoogleAuthProvider: jest.fn(),
    signInWithPopup: jest.fn(),
  };
});

describe('LoginButtonWithGoogle component', () => {
  it('renders correctly', () => {
    render(<LoginButtonWithGoogle />);

    expect(screen.getByText('Entrar com o Google')).toBeInTheDocument();
  });

  it('redirects to the conversations page if the user is logged in', () => {
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
