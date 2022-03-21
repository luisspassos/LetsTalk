import { render, screen, fireEvent } from '@testing-library/react';
import { AuthProvider, AuthContext } from '../../contexts/AuthContext';
import Login from '../../pages/index';

jest.mock('../../services/firebase', () => {
  return {
    auth: jest.fn(),
  };
});

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

  it('signInWithEmailAndPassword is running', async () => {
    const contextCallback = jest.fn();
    render(
      <AuthProvider>
        <Login />
        <AuthContext.Consumer>{contextCallback}</AuthContext.Consumer>
      </AuthProvider>
    );

    const loginButton = screen.getByText('ENTRAR');
    fireEvent.click(loginButton);

    expect(contextCallback.mock.calls[0][0]).toEqual({
      signInWithEmailAndPassword: contextCallback.mock.calls[0][0],
    });
  });
});
