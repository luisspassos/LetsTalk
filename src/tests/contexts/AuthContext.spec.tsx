import { cleanup, render, screen } from '@testing-library/react';
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
import Conversations from '../../pages/conversas';
import { act } from 'react-dom/test-utils';
import { mocked } from 'jest-mock';

jest.useFakeTimers();
jest.spyOn(global, 'setInterval');

jest.mock('nookies', () => {
  return {
    set: jest.fn(),
  };
});

jest.mock('../../services/firebase', () => {
  return {
    auth: {
      onIdTokenChanged: jest.fn(),
      currentUser: {
        getIdToken: jest.fn(),
      },
    },
  };
});

const onIdTokenChangedMock = mocked(auth.onIdTokenChanged);

onIdTokenChangedMock.mockImplementation(((
  callback: (user: { getIdToken: () => string; email: string }) => void
) => {
  callback({
    getIdToken: () => 'fake-token',
    email: 'email@gmail.com',
  });
}) as any);

jest.mock('firebase/auth', () => {
  return {
    signInWithEmailAndPassword: jest.fn().mockResolvedValueOnce({
      user: 'fake-user',
    }),
    sendPasswordResetEmail: jest.fn(),
  };
});

async function renderConversationsPage() {
  await act(async () => {
    render(
      <AuthProvider>
        <Conversations />
      </AuthProvider>
    );
  });
}

describe('Auth context', () => {
  beforeEach(async () => {
    await renderConversationsPage();
  });

  it("if there is no user connected, you must reset the token's cookie and set the user state to null", async () => {
    cleanup();

    onIdTokenChangedMock.mockImplementationOnce(((callback: () => void) => {
      callback();
    }) as any);

    await renderConversationsPage();

    expect(screen.queryByText('email@gmail.com')).not.toBeInTheDocument();
    expect(nookies.set).toHaveBeenCalledWith(undefined, 'token', '', {
      path: '/',
    });
  });

  it("if any user is connected, you must set the user's state and set his token in the cookies", async () => {
    expect(await screen.findByText('email@gmail.com')).toBeInTheDocument();
    expect(nookies.set).toHaveBeenCalledWith(undefined, 'token', 'fake-token', {
      path: '/',
    });
  });

  it('renders correctly', () => {
    expect(screen.getByText('Conversations')).toBeInTheDocument();
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

  it("must start an interval that every 10 min updates the user's token", () => {
    jest.runOnlyPendingTimers();
    expect(setInterval).toHaveBeenLastCalledWith(
      expect.any(Function),
      10 * 60 * 1000 /* 10 minutes */
    );
    expect(auth.currentUser?.getIdToken).toHaveBeenCalledWith(true);
  });
});
