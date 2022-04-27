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
  fillUser: (newUser: TokenUser) => void;
  refreshToken: () => Promise<void>;
  addUsernameInDb: AddUsernameInDbFunc;
};

export type TokenUser = {
  username: string;
} & DecodedIdToken;

type UserType = TokenUser | null;

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
  } = await import('firebase/firestore');
  const currentUserIdRef = doc(db, 'users', 'current_user_id');

  await updateDoc(currentUserIdRef, {
    id: incrementId(1),
  });

  const currentUserIdSnap = await getDoc(currentUserIdRef);

  const id = currentUserIdSnap.data()?.id;

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

export const signOut = async () => {
  const { auth } = await import('../services/firebase');
  const { signOut } = await import('firebase/auth');

  await signOut(auth);
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
  const [user, setUser] = useState<UserType>(null);

  const fillUser = useCallback((newUser: TokenUser) => {
    setUser(newUser);
  }, []);

  // token listener
  useEffect(() => {
    return auth.onIdTokenChanged(async (user) => {
      if (!user) {
        nookies.set(undefined, 'token', '', { path: '/' });
      } else {
        const token = await user.getIdToken();
        nookies.set(undefined, 'token', token, { path: '/' });
      }
    });
  }, []);

  // token refresh every 10 min
  useEffect(() => {
    const handle = setInterval(async () => {
      await refreshToken();
    }, 10 * 60 * 1000 /* 10 minutes */);

    return () => clearInterval(handle);
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
