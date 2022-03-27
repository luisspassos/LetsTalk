import { render, screen, fireEvent } from '@testing-library/react';
import ChangePassword from '../../pages/trocar-senha';
import { act } from 'react-dom/test-utils';
import { mocked } from 'jest-mock';
import { useRouter } from 'next/router';
import { confirmPasswordReset } from 'firebase/auth';

jest.mock('next/router');

const useRouterMocked = mocked(useRouter);
const pushMock = jest.fn();

useRouterMocked.mockReturnValue({
  push: pushMock,
} as any);

jest.mock('firebase/auth');
const confirmPasswordResetMocked = mocked(confirmPasswordReset);

jest.mock('../../services/firebase', () => {
  return {
    auth: jest.fn(),
  };
});

describe('ChangePassword page', () => {
  beforeEach(() => {
    render(<ChangePassword actionCode='fake-actionCode' />);
  });

  it('renders correctly', () => {
    expect(screen.getByText('Trocar sua senha')).toBeInTheDocument();
  });

  it('should show a password required message if it is missing', async () => {
    const resetButton = screen.getByText('REDEFINIR');

    fireEvent.click(resetButton);

    expect(await screen.findByText('Senha obrigatória')).toBeInTheDocument();
  });

  it('should show a message of minimum password characters', async () => {
    const resetButton = screen.getByText('REDEFINIR');
    const passwordInput = screen.getByLabelText('Nova senha');

    fireEvent.change(passwordInput, { target: { value: '12345' } });

    fireEvent.click(resetButton);

    expect(
      await screen.findByText('No mínimo 6 caracteres')
    ).toBeInTheDocument();
  });

  it('should show an error message if new password is different from confirm password', async () => {
    const resetButton = screen.getByText('REDEFINIR');
    const passwordInput = screen.getByLabelText('Nova senha');

    fireEvent.change(passwordInput, { target: { value: '12345' } });

    fireEvent.click(resetButton);

    expect(
      await screen.findByText('As senhas precisam ser iguais')
    ).toBeInTheDocument();
  });

  it('if the password is successfully reset, it must redirect the user to the login page with the parameter "?success=passwordreset"', async () => {
    const resetButton = screen.getByText('REDEFINIR');
    const passwordInput = screen.getByLabelText('Nova senha');
    const confirmPasswordInput = screen.getByLabelText('Confirme sua senha');

    fireEvent.change(passwordInput, { target: { value: '123456' } });
    fireEvent.change(confirmPasswordInput, { target: { value: '123456' } });

    await act(async () => {
      fireEvent.click(resetButton);
    });

    expect(pushMock).toHaveBeenCalledWith('/?success=passwordreset');
  });

  it('should emit an error toast if it gives one when resetting the password', async () => {
    confirmPasswordResetMocked.mockImplementationOnce(() => {
      throw new Error('fake-error');
    });

    const resetButton = screen.getByText('REDEFINIR');
    const passwordInput = screen.getByLabelText('Nova senha');
    const confirmPasswordInput = screen.getByLabelText('Confirme sua senha');

    fireEvent.change(passwordInput, { target: { value: '123456' } });
    fireEvent.change(confirmPasswordInput, { target: { value: '123456' } });

    await act(async () => {
      fireEvent.click(resetButton);
    });

    expect(
      screen.getByText('Ocorreu um erro ao mudar a senha')
    ).toBeInTheDocument();
  });
});
