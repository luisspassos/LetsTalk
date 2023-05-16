import { render, screen, fireEvent } from '@testing-library/react';
import { LoginButtonWithGoogle } from '.';
import { mocked } from 'jest-mock';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { act } from 'react-dom/test-utils';

jest.mock('firebase/auth');

const signInWithPopupMocked = mocked(signInWithPopup);
mocked(GoogleAuthProvider);

signInWithPopupMocked.mockResolvedValue({
  user: 'fake-user',
} as any);

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

  describe('errors', () => {
    function triggerError(err: string | Error) {
      signInWithPopupMocked.mockImplementationOnce(() => {
        throw err;
      });
    }

    it('should not show error if user closes signIn popup', async () => {
      triggerError('popup-closed-by-user');

      await pressTheButton();

      expect(
        screen.queryByText('Ocorreu um erro desconhecido. Tente novamente')
      ).toBeNull();
    });

    it('should show an unknown error', async () => {
      triggerError(new Error('fake-error'));

      await pressTheButton();

      expect(
        await screen.findByText('Ocorreu um erro desconhecido. Tente novamente')
      ).toBeInTheDocument();
    });
  });
});
