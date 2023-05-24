import { render } from '@testing-library/react';
import { mocked } from 'jest-mock';
import { signInWithPopup } from 'firebase/auth';
import { LoginButtonWithGoogle } from '.';
import { testUnknownError } from 'tests/utils/testUnknownError';
import { getButton } from 'tests/utils/Button/getButton';
import { clickButton } from 'tests/utils/Button/clickButton';

const signInWithPopupMocked = mocked(signInWithPopup);

async function pressTheButton() {
  const button = getButton('Entrar com o Google');

  await clickButton(button);
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
