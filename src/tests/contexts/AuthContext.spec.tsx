import { render, screen } from '@testing-library/react';
import {
  AuthProvider,
  signInWithEmailAndPassword,
  sendEmailToRecoverPassword,
} from '../../contexts/AuthContext';
import {
  signInWithEmailAndPassword as FirebaseSignInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from '../../services/firebase';

jest.mock('../../services/firebase', () => {
  return {
    auth: jest.fn(),
  };
});

jest.mock('firebase/auth', () => {
  return {
    signInWithEmailAndPassword: jest.fn().mockResolvedValueOnce({
      user: 'fake-user',
    }),
    sendPasswordResetEmail: jest.fn(),
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

  it('signInWithEmailAndPassword function should return login result', async () => {
    const loginResult = await signInWithEmailAndPassword({
      email: 'email@gmail.com',
      password: '123456',
    });

    expect(FirebaseSignInWithEmailAndPassword).toHaveBeenCalledWith(
      auth,
      'email@gmail.com',
      '123456'
    );

    expect(loginResult).toStrictEqual({ user: 'fake-user' });
  });

  it('sendEmailToRecoverPassword function should run sendPasswordResetEmail from firebase', async () => {
    await sendEmailToRecoverPassword({ email: 'email@gmail.com' });

    expect(sendPasswordResetEmail).toHaveBeenCalledWith(
      auth,
      'email@gmail.com'
    );
  });
});
