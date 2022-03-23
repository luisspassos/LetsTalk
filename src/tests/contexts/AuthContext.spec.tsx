import { render, screen } from '@testing-library/react';
import {
  AuthProvider,
  signInWithEmailAndPassword,
} from '../../contexts/AuthContext';
import { signInWithEmailAndPassword as FirebaseSignInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebase';
import { mocked } from 'jest-mock';

jest.mock('../../contexts/AuthContext');

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

  it('should return login result', async () => {
    const signInWithEmailAndPasswordMocked = mocked(signInWithEmailAndPassword);

    signInWithEmailAndPasswordMocked.mockResolvedValueOnce({
      user: 'fake-user',
    } as any);

    const loginResult = await signInWithEmailAndPassword({
      email: 'email@gmail.com',
      password: '123456',
    });

    expect(FirebaseSignInWithEmailAndPassword).toHaveBeenCalledWith(
      auth,
      'email@gmail.com',
      '123456'
    );
  });
});
