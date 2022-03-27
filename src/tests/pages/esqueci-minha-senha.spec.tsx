import { render, screen, fireEvent } from '@testing-library/react';
import IForgotMyPassword from '../../pages/esqueci-minha-senha';
import { AuthContext } from '../../contexts/AuthContext';
import { act } from 'react-dom/test-utils';
import { FirebaseError } from 'firebase/app';
import { spinnerTimeout } from '../utils/spinnerTimeout';

const sendEmailToRecoverPassword = jest.fn();

describe('IForgotMyPassword page', () => {
  it('renders correctly', () => {
    render(<IForgotMyPassword />);

    expect(
      screen.getByText('Envie seu email para recuperar sua senha')
    ).toBeInTheDocument();
  });

  it('must run .trim() on email', async () => {
    render(
      <AuthContext.Provider value={{ sendEmailToRecoverPassword } as any}>
        <IForgotMyPassword />
      </AuthContext.Provider>
    );

    const sendButton = screen.getByText('ENVIAR');
    const emailInput = screen.getByLabelText('Email');

    fireEvent.change(emailInput, {
      target: { value: '      email@gmail.com ' },
    });
    await act(async () => {
      fireEvent.click(sendButton);
    });

    expect(sendEmailToRecoverPassword).toHaveBeenCalledWith({
      email: 'email@gmail.com',
    });
  });

  it('should issue a success toast if the email was sent', async () => {
    sendEmailToRecoverPassword.mockResolvedValueOnce('fake-return');

    render(
      <AuthContext.Provider value={{ sendEmailToRecoverPassword } as any}>
        <IForgotMyPassword />
      </AuthContext.Provider>
    );

    const sendButton = screen.getByText('ENVIAR');
    const emailInput = screen.getByLabelText('Email');

    fireEvent.change(emailInput, {
      target: { value: 'email@gmail.com' },
    });

    await act(async () => {
      fireEvent.click(sendButton);
    });

    expect(screen.getAllByText('Email enviado')[0]).toBeInTheDocument();
  });

  it('trigger error message if user not found', async () => {
    sendEmailToRecoverPassword.mockImplementationOnce(() => {
      throw new FirebaseError('auth/user-not-found', 'error-message');
    });

    render(
      <AuthContext.Provider value={{ sendEmailToRecoverPassword } as any}>
        <IForgotMyPassword />
      </AuthContext.Provider>
    );

    const sendButton = screen.getByText('ENVIAR');
    const emailInput = screen.getByLabelText('Email');

    fireEvent.change(emailInput, {
      target: { value: 'email@gmail.com' },
    });

    await act(async () => {
      fireEvent.click(sendButton);
    });

    expect(screen.getByText('Este usuário não existe')).toBeInTheDocument();
  });

  it('trigger error message if have many requests', async () => {
    sendEmailToRecoverPassword.mockImplementationOnce(() => {
      throw new FirebaseError('auth/too-many-requests', 'error-message');
    });

    render(
      <AuthContext.Provider value={{ sendEmailToRecoverPassword } as any}>
        <IForgotMyPassword />
      </AuthContext.Provider>
    );

    const sendButton = screen.getByText('ENVIAR');
    const emailInput = screen.getByLabelText('Email');

    fireEvent.change(emailInput, {
      target: { value: 'email@gmail.com' },
    });

    await act(async () => {
      fireEvent.click(sendButton);
    });

    expect(screen.getByText('Tente novamente mais tarde')).toBeInTheDocument();
  });

  it('trigger error message if he is unknown', async () => {
    sendEmailToRecoverPassword.mockImplementationOnce(() => {
      throw new FirebaseError('unknown error', 'error-message');
    });

    render(
      <AuthContext.Provider value={{ sendEmailToRecoverPassword } as any}>
        <IForgotMyPassword />
      </AuthContext.Provider>
    );

    const sendButton = screen.getByText('ENVIAR');
    const emailInput = screen.getByLabelText('Email');

    fireEvent.change(emailInput, {
      target: { value: 'email@gmail.com' },
    });

    await act(async () => {
      fireEvent.click(sendButton);
    });

    expect(
      screen.getByText('Ocorreu um erro desconhecido')
    ).toBeInTheDocument();
  });

  it('the enter button should render a spinner when clicking it', async () => {
    const sendEmailToRecoverPassword = jest.fn(spinnerTimeout);

    render(
      <AuthContext.Provider value={{ sendEmailToRecoverPassword } as any}>
        <IForgotMyPassword />
      </AuthContext.Provider>
    );

    const sendButton = screen.getByText('ENVIAR');
    const emailInput = screen.getByLabelText('Email');

    fireEvent.change(emailInput, { target: { value: 'email@gmail.com' } });

    await act(async () => {
      fireEvent.click(sendButton);
    });

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
