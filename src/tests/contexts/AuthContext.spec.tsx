import { render, screen, fireEvent } from '@testing-library/react';
import { AuthContext, AuthProvider } from '../../contexts/AuthContext';
import Login from '../../pages/index';
import { act } from 'react-dom/test-utils';

jest.mock('firebase/auth', () => {
  return {
    signInWithEmailAndPassword: jest.fn(),
  };
});

describe('Auth context', () => {
  it('renders correctly', () => {
    render(
      <AuthProvider>
        <div>component</div>
      </AuthProvider>
    );

    expect(screen.getByText('component')).toBeInTheDocument();
  });

  it('must execute FirebaseSignInWithEmailAndPassword function', async () => {
    const signInWithEmailAndPassword = jest.fn();

    render(
      <AuthContext.Provider value={{ signInWithEmailAndPassword }}>
        <Login />
      </AuthContext.Provider>
    );

    const loginButton = screen.getByText('ENTRAR');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Senha');

    fireEvent.change(emailInput, { target: { value: 'email@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    await act(async () => {
      fireEvent.click(loginButton);
    });
  });
});
