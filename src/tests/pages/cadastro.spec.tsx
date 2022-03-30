import { render, screen, fireEvent } from '@testing-library/react';
import Register from '../../pages/cadastro';
import { act } from 'react-dom/test-utils';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../services/firebase';

jest.mock('../../services/firebase', () => {
  return {
    auth: 'fake-auth',
  };
});

jest.mock('firebase/auth', () => {
  return {
    createUserWithEmailAndPassword: jest.fn().mockReturnValue({
      user: 'fake-user',
    }),
    sendEmailVerification: jest.fn(),
    updateProfile: jest.fn(),
  };
});

describe('cadastro page', () => {
  beforeEach(() => {
    render(<Register />);
  });

  async function fillInTheInputsAndPressTheButton() {}

  it('renders correctly', () => {
    expect(
      screen.getByText('Mais de 200 mil usuários já estão conversando!')
    ).toBeInTheDocument();
  });

  it('name and email must receive .trim()', async () => {
    const nameInput = screen.getByLabelText('Nome');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Senha');
    const confirmPasswordInput = screen.getByLabelText('Confirmar senha');
    const registerButton = screen.getByText('CADASTRAR');

    fireEvent.change(nameInput, { target: { value: '     John Doe     ' } });
    fireEvent.change(emailInput, {
      target: { value: 'johndoe@email.com    ' },
    });
    fireEvent.change(passwordInput, { target: { value: '123456' } });
    fireEvent.change(confirmPasswordInput, { target: { value: '123456' } });
    await act(async () => {
      fireEvent.click(registerButton);
    });

    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
      auth,
      'johndoe@email.com',
      '123456'
    );

    expect(updateProfile).toHaveBeenCalledWith('fake-user', {
      displayName: 'John Doe',
    });
  });

  it('should trigger error messages if inputs are empty', async () => {
    const registerButton = screen.getByText('CADASTRAR');

    fireEvent.click(registerButton);

    expect(await screen.findByText('E-mail obrigatório')).toBeInTheDocument();
    expect(await screen.findByText('Nome obrigatório')).toBeInTheDocument();
    expect(await screen.findByText('Senha obrigatória')).toBeInTheDocument();
  });

  it('should trigger an error message if the email is incorrect', async () => {
    const nameInput = screen.getByLabelText('Nome');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Senha');
    const confirmPasswordInput = screen.getByLabelText('Confirmar senha');
    const registerButton = screen.getByText('CADASTRAR');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, {
      target: { value: 'johndoe' },
    });
    fireEvent.change(passwordInput, { target: { value: '123456' } });
    fireEvent.change(confirmPasswordInput, { target: { value: '123456' } });
    await act(async () => {
      fireEvent.click(registerButton);
    });

    expect(screen.getByText('E-mail inválido')).toBeInTheDocument();
  });
});
