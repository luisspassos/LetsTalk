import { screen, fireEvent, render } from '@testing-library/react';
import { mocked } from 'jest-mock';
import { signInWithPopup } from 'firebase/auth';
import { act } from 'react-dom/test-utils';
import { LoginButtonWithGoogle } from '.';
import { testUnknownError } from 'tests/utils/testUnknownError';

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

    testUnknownError(triggerError);
  });
});
