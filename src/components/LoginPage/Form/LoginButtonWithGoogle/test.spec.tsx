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

jest.useFakeTimers();

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

    it('should not show an error if user closes signIn popup', async () => {
      await triggerError('popup-closed-by-user');

      expect(document.body.textContent).toBe('Entrar com o Google');
    });

    it('should show an unknown error and last 6 seconds', async () => {
      await triggerError();

      const start = performance.now();

      await act(async () => {
        jest.runAllTimers();
      });

      function queryError() {
        const message = 'Ocorreu um erro desconhecido. Tente novamente';

        return screen.queryAllByRole('alert', {
          name: message,
        });
      }

      await waitForElementToBeRemoved(() => queryError());

      const end = performance.now();

      const duration = end - start;

      expect(queryError()).toStrictEqual([]);

      const errDuration = 6000 + 1052; // 6 seconds in milliseconds;

      expect(duration).toBe(errDuration);
    });
  });
});
