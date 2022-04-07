import { User, UserCredential } from 'firebase/auth';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { auth } from '../services/firebase';
import nookies from 'nookies';

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
};

type UserType = User | null;

export const AuthContext = createContext({} as AuthContextData);

export const getCurrentUserId = async () => {
  const { db } = await import('../services/firebase');

  const {
    doc,
    getDoc,
    increment: incrementId,
    updateDoc,
  } = await import('firebase/firestore');
  const currentUserIdRef = doc(db, 'conversations', 'current_user_id');

  await updateDoc(currentUserIdRef, {
    id: incrementId(1),
  });

  const currentUserIdSnap = await getDoc(currentUserIdRef);

  const id = currentUserIdSnap.data()?.id;

  return id;
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

  // token listener
  useEffect(() => {
    return auth.onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null);
        nookies.set(undefined, 'token', '', { path: '/' });
      } else {
        const token = await user.getIdToken();
        setUser(user);
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
        getCurrentUserId,
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
