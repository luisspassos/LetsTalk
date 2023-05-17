import { render, screen, fireEvent } from '@testing-library/react';
import { LoginButtonWithGoogle } from '.';
import { mocked } from 'jest-mock';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { act } from 'react-dom/test-utils';

jest.mock('firebase/auth');

jest.setTimeout(7000);

const signInWithPopupMocked = mocked(signInWithPopup);
mocked(GoogleAuthProvider);

signInWithPopupMocked.mockResolvedValue({
  user: 'fake-user',
} as any);

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
    beforeEach(() => {
      document.getElementById('chakra-toast-portal')?.remove();
    });

    function triggerError(err: string | Error) {
      signInWithPopupMocked.mockImplementationOnce(() => {
        throw err;
      });
    }

    it('should not show an error toast if user closes signIn popup', async () => {
      triggerError('popup-closed-by-user');

      await pressTheButton();

      async function assert() {
        try {
          const el = await screen.findByText(
            'Ocorreu um erro desconhecido. Tente novamente',
            {},
            {
              timeout: 5000,
            }
          );

          return el;
        } catch {
          return null;
        }
      }

      const result = await assert();

      expect(result).toBeNull;
    });

    it('should show an unknown error', async () => {
      triggerError(new Error('fake-error'));

      await pressTheButton();

      expect(
        await screen.findByText('Ocorreu um erro desconhecido. Tente novamente')
      ).toBeInTheDocument();
    });

    //   it('disappear', async () => {
    //     triggerError(new Error('fake-error'));

    //     await pressTheButton();

    //     await waitFor(
    //       () => {
    //         expect(
    //           screen.getByText('Ocorreu um erro desconhecido. Tente novamente')
    //         ).toBeInTheDocument();
    //       },
    //       {
    //         interval: -1,
    //         timeout: 5999,
    //       }
    //     );
    //   });
  });
});
