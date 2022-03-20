import { render, screen } from '@testing-library/react';
import { AuthProvider, AuthProviderProps } from '../../contexts/AuthContext';

jest.mock('../../contexts/AuthContext', () => {
  return {
    AuthProvider: ({ children }: AuthProviderProps): JSX.Element => {
      return <>{children}</>;
    },
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

  it('signInWithEmailAndPassword is running', async () => {});
});
