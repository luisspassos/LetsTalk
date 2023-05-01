import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginButtonWithGoogle } from 'components/LoginPage/Form/LoginButtonWithGoogle';
import { mocked } from 'jest-mock';
import { useRouter } from 'next/router';
import {
  signInWithPopup,
  GoogleAuthProvider,
  getAdditionalUserInfo,
} from 'firebase/auth';
import { addUsernameInDb, setUsername, useAuth } from 'contexts/AuthContext';
import { act } from 'react-dom/test-utils';

// 'contexts/AuthContext'

jest.mock('contexts/AuthContext', () => ({
  useAuth: jest.fn().mockReturnValue({
    initializeUser: jest.fn(),
  }),
  setUsername: jest.fn().mockResolvedValue({
    username: 'fake-username',
  }),
  addUsernameInDb: jest.fn(),
}));

// 'services/firebase'

jest.mock('services/firebase', () => {
  return {
    auth: 'fake-auth',
  };
});

// 'next/router';

jest.mock('next/router');

const useRouterMocked = mocked(useRouter);
const pushMock = jest.fn();

useRouterMocked.mockReturnValue({
  push: pushMock,
} as any);

// 'firebase/auth'

jest.mock('firebase/auth');

const signInWithPopupMocked = mocked(signInWithPopup);
mocked(GoogleAuthProvider);

const getAdditionalUserInfoMocked = mocked(getAdditionalUserInfo);

signInWithPopupMocked.mockResolvedValue({
  user: 'fake-user',
} as any);

//

async function pressTheButton() {
  const loginButtonWithGoogle = screen.getByText('Entrar com o Google');

  await act(async () => {
    fireEvent.click(loginButtonWithGoogle);
  });
}

describe('LoginButtonWithGoogle component', () => {
  beforeEach(() => {
    render(<LoginButtonWithGoogle />);

    function removeToasts() {
      document.getElementById('chakra-toast-portal')?.remove();
    }

    removeToasts();
  });

  it('renders correctly', () => {
    expect(screen.getByText('Entrar com o Google')).toBeInTheDocument();
  });

  describe('new user', () => {
    beforeEach(async () => {
      getAdditionalUserInfoMocked.mockReturnValueOnce({
        isNewUser: true,
      } as any);

      await pressTheButton();
    });

    it(`if user doesn't have a predefined displayName, then it will be "Usuário"`, async () => {
      await waitFor(() =>
        expect(setUsername).toHaveBeenCalledWith(
          expect.objectContaining({ name: 'Usuário' })
        )
      );
    });

    it('initializeUser and addUsernameInDb are running', async () => {
      const { initializeUser } = useAuth();

      expect(initializeUser).toHaveBeenCalled();
      expect(addUsernameInDb).toHaveBeenCalled();
    });
  });

  it('redirects to the conversations page if the user is logged in', async () => {
    await pressTheButton();

    await waitFor(() => expect(pushMock).toHaveBeenCalledWith('/conversas'));
  });

  describe('errors', () => {
    function triggerError(err: string | Error) {
      signInWithPopupMocked.mockImplementationOnce(() => {
        throw err;
      });
    }

    it('stops catch block if user closes signIn popup', async () => {
      triggerError('popup-closed-by-user');

      await pressTheButton();

      expect(
        screen.queryByText('Ocorreu um erro desconhecido. Tente novamente')
      ).toBeNull();
    });

    it('fire error toast if function handleSignInWithGoogle falls into catch with unknown error', async () => {
      triggerError(new Error('fake-error'));

      await pressTheButton();

      expect(
        await screen.findByText('Ocorreu um erro desconhecido. Tente novamente')
      ).toBeInTheDocument();
    });
  });
});
