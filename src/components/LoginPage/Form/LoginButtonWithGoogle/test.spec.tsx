import {
  screen,
  fireEvent,
  render,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { mocked } from 'jest-mock';
import { signInWithPopup } from 'firebase/auth';
import { act } from 'react-dom/test-utils';
import { LoginButtonWithGoogle } from '.';

jest.mock('firebase/auth');

jest.setTimeout(8000);

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

    it('should show an unknown error and last 6 seconds', async () => {
      await triggerError();

      const start = performance.now();

      await waitForElementToBeRemoved(
        () =>
          screen.queryAllByText(
            'Ocorreu um erro desconhecido. Tente novamente'
          ),
        {
          timeout: 8000,
        }
      );

      const end = performance.now();

      const errorDuration = end - start;

      expect(errorDuration).toBeGreaterThanOrEqual(6500);
      expect(errorDuration).toBeLessThanOrEqual(7500);

      expect(
        screen.queryByText('Ocorreu um erro desconhecido. Tente novamente')
      ).toBeNull();
    });
  });
});
