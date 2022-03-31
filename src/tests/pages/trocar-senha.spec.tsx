import { render, screen, fireEvent } from '@testing-library/react';
import ChangePassword, { getServerSideProps } from '../../pages/trocar-senha';
import { act } from 'react-dom/test-utils';
import { mocked } from 'jest-mock';
import { useRouter } from 'next/router';
import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';
import { spinnerTimeout } from '../functionalities/spinnerTimeout';

jest.mock('next/router');
const useRouterMocked = mocked(useRouter);
const pushMock = jest.fn();

useRouterMocked.mockReturnValue({
  push: pushMock,
} as any);

jest.mock('firebase/auth');
const confirmPasswordResetMocked = mocked(confirmPasswordReset);
const verifyPasswordResetCodeMocked = mocked(verifyPasswordResetCode);

jest.mock('../../services/firebase', () => {
  return {
    auth: jest.fn(),
  };
});

describe('ChangePassword page', () => {
  beforeEach(() => {
    render(<ChangePassword actionCode='fake-actionCode' />);
  });

  async function fillInPasswordEntriesAndPressTheButton() {
    const resetButton = screen.getByText('REDEFINIR');
    const passwordInput = screen.getByLabelText('Nova senha');
    const confirmPasswordInput = screen.getByLabelText('Confirme sua senha');

    fireEvent.change(passwordInput, { target: { value: '123456' } });
    fireEvent.change(confirmPasswordInput, { target: { value: '123456' } });

    await act(async () => {
      fireEvent.click(resetButton);
    });
  }

  it('renders correctly', () => {
    expect(screen.getByText('Trocar sua senha')).toBeInTheDocument();
  });

  it('should show a password required message if it is missing', async () => {
    const resetButton = screen.getByText('REDEFINIR');

    fireEvent.click(resetButton);

    expect(await screen.findByText('Senha obrigatória')).toBeInTheDocument();
  });

  it.each`
    message
    ${'No mínimo 6 caracteres'}
    ${'As senhas precisam ser iguais'}
  `(
    'should show password error as per "$message"',
    async ({ message }: { message: string }) => {
      const resetButton = screen.getByText('REDEFINIR');
      const passwordInput = screen.getByLabelText('Nova senha');

      fireEvent.change(passwordInput, { target: { value: '12345' } });

      fireEvent.click(resetButton);

      expect(await screen.findByText(message)).toBeInTheDocument();
    }
  );

  it('if the password is successfully reset, it must redirect the user to the login page with the parameter "?success=passwordreset"', async () => {
    await fillInPasswordEntriesAndPressTheButton();

    expect(pushMock).toHaveBeenCalledWith('/?success=passwordreset');
  });

  it('should emit an error toast if it gives one when resetting the password', async () => {
    confirmPasswordResetMocked.mockImplementationOnce(() => {
      throw new Error('fake-error');
    });

    await fillInPasswordEntriesAndPressTheButton();

    expect(
      screen.getByText('Ocorreu um erro ao mudar a senha')
    ).toBeInTheDocument();
  });

  it('the reset button should render a spinner when clicking it', async () => {
    confirmPasswordResetMocked.mockImplementationOnce(spinnerTimeout as any);

    await fillInPasswordEntriesAndPressTheButton();

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('there must be a link back to the login page', () => {
    const backLink = screen.getByText('Voltar');

    expect(backLink).toBeInTheDocument();
    expect(backLink.closest('a')).toHaveAttribute('href', '/');
  });

  async function getServerSidePropsResponse() {
    const response = await getServerSideProps({
      query: {
        oobCode: 'fake-actionCode',
      },
    } as any);

    return response;
  }

  it('getServerSideProps should return actionCode if verifyPasswordResetCode passes', async () => {
    expect(await getServerSidePropsResponse()).toEqual({
      props: {
        actionCode: 'fake-actionCode',
      },
    });
  });

  it('getServerSideProps should return user to login page if verifyPasswordResetCode gives error', async () => {
    verifyPasswordResetCodeMocked.mockImplementationOnce(() => {
      throw new Error('fake-error');
    });

    expect(await getServerSidePropsResponse()).toEqual({
      redirect: {
        destination: '/?error=passwordreset',
        permanent: false,
      },
    });
  });
});
