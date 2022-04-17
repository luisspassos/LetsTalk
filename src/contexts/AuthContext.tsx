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
  setUsername: ({ user, name }: SetUsernameParams) => Promise<void>;
  fillUser: (newUser: DecodedIdToken) => void;
};

type UserType = DecodedIdToken | null;

type SetUsernameParams = {
  user: User;
  name: string;
};

export const AuthContext = createContext({} as AuthContextData);

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

export const setUsername = async ({ user, name }: SetUsernameParams) => {
  const { updateProfile } = await import('firebase/auth');
  const { setDoc, doc } = await import('firebase/firestore');
  const { db } = await import('../services/firebase');

  const id = await getCurrentUserId();

  const username = `${name}#${id}`;

  await updateProfile(user, {
    displayName: username,
  });
  await setDoc(doc(db, 'users', 'allUsers'), []);
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

  const fillUser = useCallback((newUser: DecodedIdToken) => {
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
      const user = auth.currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000 /* 10 minutes */);

    return () => clearInterval(handle);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        setUsername,
        getCurrentUserId,
        fillUser,
        signInWithEmailAndPassword,
        sendEmailToRecoverPassword,
        signOut,
        user,
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
