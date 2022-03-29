import { render, screen, fireEvent } from '@testing-library/react';
import Register from '../../pages/cadastro';
import { act } from 'react-dom/test-utils';
import { updateProfile } from 'firebase/auth';

jest.mock('../../services/firebase', () => {
  return {
    auth: 'fake-auth',
  };
});

jest.mock('firebase/auth', () => {
  return {
    createUserWithEmailAndPassword() {
      return {
        user: 'fake-user',
      };
    },
    sendEmailVerification: jest.fn(),
    updateProfile: jest.fn(),
  };
});

describe('cadastro page', () => {
  beforeEach(() => {
    render(<Register />);
  });

  it('renders correctly', () => {
    expect(
      screen.getByText('Mais de 200 mil usuários já estão conversando!')
    ).toBeInTheDocument();
  });

  it('name must receive .trim()', async () => {
    const nameInput = screen.getByLabelText('Nome');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Senha');
    const confirmPasswordInput = screen.getByLabelText('Confirmar senha');
    const registerButton = screen.getByText('CADASTRAR');

    fireEvent.change(nameInput, { target: { value: '     John Doe     ' } });
    fireEvent.change(emailInput, { target: { value: 'johndoe@email.com' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });
    fireEvent.change(confirmPasswordInput, { target: { value: '123456' } });
    await act(async () => {
      fireEvent.click(registerButton);
    });

    expect(updateProfile).toHaveBeenCalledWith('fake-user', {
      displayName: 'John Doe',
    });
  });

  it('should trigger error messages if inputs are empty');
});
