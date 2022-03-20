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

  it('signInWithEmailAndPassword is running', async () => {});
});
