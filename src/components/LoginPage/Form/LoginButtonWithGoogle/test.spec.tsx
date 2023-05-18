import { screen, fireEvent, render } from '@testing-library/react';
import { mocked } from 'jest-mock';
import { signInWithPopup } from 'firebase/auth';
import { act } from 'react-dom/test-utils';
import { LoginButtonWithGoogle } from '.';

jest.mock('firebase/auth');

const signInWithPopupMocked = mocked(signInWithPopup);

async function pressTheButton() {
  const loginButtonWithGoogle = screen.getByRole('button', {
    name: 'Entrar com o Google',
  });

  await act(async () => {
    fireEvent.click(loginButtonWithGoogle);
  });
}

describe('LoginButtonWithGoogle component', () => {
  beforeEach(() => {
    render(<LoginButtonWithGoogle />);
  });

  describe('errors', () => {
    async function triggerError(err?: string) {
      signInWithPopupMocked.mockImplementationOnce(() => {
        throw err ?? 'error';
      });

      await pressTheButton();
    }

    // continue with this testing position to avoid bugs with toasts of ChakraUI
    it('should not show an error if user closes signIn popup', async () => {
      await triggerError('popup-closed-by-user');

      expect(document.body.textContent).toBe('Entrar com o Google');
    });

    it('should show an unknown error', async () => {
      await triggerError();

      expect(
        screen.getByText('Ocorreu um erro desconhecido. Tente novamente')
      ).toBeInTheDocument();

      await new Promise((r) => setTimeout(r, 5999));

      expect(
        screen.getByText('Ocorreu um erro desconhecido. Tente novamente')
      ).toBeInTheDocument();
    });
  });
});
