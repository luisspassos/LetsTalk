import { User, UserCredential } from 'firebase/auth';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { auth } from '../services/firebase';
import nookies from 'nookies';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { useRouter } from 'next/router';

export type AuthProviderProps = {
  children: ReactNode;
};

type SignInData = {
  email: string;
  password: string;
};

type SendEmailToRecoverPasswordData = {
  email: string;
};

type AddUsernameInDbFunc = (username: string, uid: string) => Promise<void>;

type AuthContextData = {
  getCurrentUserId: () => Promise<number>;
  signOut: () => Promise<void>;
  signInWithEmailAndPassword: ({
    email,
    password,
  }: SignInData) => Promise<UserCredential>;
  sendEmailToRecoverPassword: ({
    email,
  }: SendEmailToRecoverPasswordData) => Promise<void>;
  user: UserType;
  setUsername: ({
    user,
    name,
  }: SetUsernameParams) => Promise<{ username: string }>;
  fillUser: (newUser: UserType) => void;
  refreshToken: () => Promise<void>;
  addUsernameInDb: AddUsernameInDbFunc;
};

export type UserType = {
  username: string;
} & DecodedIdToken;

type SetUsernameParams = {
  user: User;
  name: string;
};

export const AuthContext = createContext({} as AuthContextData);

export const refreshToken = async () => {
  const user = auth.currentUser;
  if (user) await user.getIdToken(true);
};

export const getCurrentUserId = async () => {
  const { db } = await import('../services/firebase');

  const {
    doc,
    getDoc,
    increment: incrementId,
    updateDoc,
    setDoc,
  } = await import('firebase/firestore');
  const currentUserIdRef = doc(db, 'users', 'current_user_id');
  const currentUserIdSnap = async () => await getDoc(currentUserIdRef);

  if ((await currentUserIdSnap()).exists()) {
    await updateDoc(currentUserIdRef, {
      id: incrementId(1),
    });
  } else {
    await setDoc(currentUserIdRef, {
      id: 1,
    });
  }

  const id: number = (await currentUserIdSnap()).data()?.id;

  return id;
};

export const addUsernameInDb: AddUsernameInDbFunc = async (username, uid) => {
  const { doc, getDoc, setDoc } = await import('firebase/firestore');
  const { db } = await import('../services/firebase');

  const usernameRef = doc(db, 'users', username);
  const usernameSnap = await getDoc(usernameRef);

  if (usernameSnap.exists()) return;

  await setDoc(usernameRef, {
    uid,
  });
};

export const setUsername = async ({ user, name }: SetUsernameParams) => {
  const { updateProfile } = await import('firebase/auth');

  const id = await getCurrentUserId();
  const username = `${name}#${id}`;

  await updateProfile(user, {
    displayName: username,
  });

  await refreshToken();

  return { username };
};

export const sendEmailToRecoverPassword = async ({
  email,
}: SendEmailToRecoverPasswordData) => {
  const { auth } = await import('../services/firebase');

  const { sendPasswordResetEmail } = await import('firebase/auth');
  await sendPasswordResetEmail(auth, email);
};

export const signInWithEmailAndPassword = async ({
  email,
  password,
}: SignInData) => {
  const { signInWithEmailAndPassword: FirebaseSignInWithEmailAndPassword } =
    await import('firebase/auth');

  const { auth } = await import('../services/firebase');

  const loginResult = await FirebaseSignInWithEmailAndPassword(
    auth,
    email,
    password
  );

  return loginResult;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState({} as UserType);
  const router = useRouter();

  const fillUser = useCallback((newUser: UserType) => {
    setUser(newUser);
  }, []);

  const signOut = async () => {
    const { auth } = await import('../services/firebase');
    const { signOut } = await import('firebase/auth');

    signOut(auth);
    router.push('/');
  };

  useEffect(() => {
    function tokenListener() {
      return auth.onIdTokenChanged(async (user) => {
        if (!user) {
          nookies.set(undefined, 'token', '', { path: '/' });
        } else {
          const token = await user.getIdToken();
          nookies.set(undefined, 'token', token, { path: '/' });
        }
      });
    }

    return tokenListener();
  }, []);

  useEffect(() => {
    function tokenRefreshEvery10Min() {
      const handle = setInterval(async () => {
        await refreshToken();
      }, 10 * 60 * 1000 /* 10 minutes */);

      return () => clearInterval(handle);
    }

    return tokenRefreshEvery10Min();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        refreshToken,
        setUsername,
        getCurrentUserId,
        fillUser,
        signInWithEmailAndPassword,
        sendEmailToRecoverPassword,
        signOut,
        user,
        addUsernameInDb,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const data = useContext(AuthContext);

  return data;
}
