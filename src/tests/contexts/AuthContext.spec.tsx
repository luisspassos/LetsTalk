import { render, screen } from '@testing-library/react';
import { AuthProvider } from '../../contexts/AuthContext';

describe('Auth context', () => {
  it('renders correctly', () => {
    render(
      <AuthProvider>
        <div>component</div>
      </AuthProvider>
    );

    expect(screen.getByText('component')).toBeInTheDocument();
  });

  jest.mock('../../contexts/AuthContext', () => {
    return {
      useAuth() {
        return {
          signInWithEmailAndPassword: jest
            .fn()
            .mockReturnValue('fake-login-result'),
        };
      },
    };
  });

  it('signInWithEmailAndPassword is running', async () => {});
});
