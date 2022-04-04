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
import nookies from 'nookies';

jest.mock('nookies', () => {
  return {
    set: jest.fn(),
  };
});

jest.mock('../../services/firebase', () => {
  return {
    auth: {
      onIdTokenChanged(callback: () => void) {
        callback();
      },
    },
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
  beforeEach(() => {
    render(
      <AuthProvider>
        <div>component</div>
      </AuthProvider>
    );
  });

  it('renders correctly', () => {
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

  it("if there is no user connected, you must reset the token's cookie and set the user state to null", () => {
    expect(nookies.set).toHaveBeenCalledWith(undefined, 'token', '', {
      path: '/',
    });
  });
});
