import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword as FirebaseSignInWithEmailAndPassword,
} from 'firebase/auth';
import { createContext, ReactNode, useCallback, useContext } from 'react';
import { auth } from '../services/firebase';
import Router from 'next/router';

type AuthProviderProps = {
  children: ReactNode;
};

type SignInData = {
  email: string;
  password: string;
};

type AuthContextData = {
  signInWithGoogle: () => Promise<void>;
  signInWithEmailAndPassword: ({
    email,
    password,
  }: SignInData) => Promise<void>;
};

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const signInWithGoogle = useCallback(async () => {
    try {
      const googleProvider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, googleProvider);

      if (user) {
        Router.push('/conversas');
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }, []);

  const signInWithEmailAndPassword = useCallback(
    async ({ email, password }: SignInData) => {
      try {
        const { user } = await FirebaseSignInWithEmailAndPassword(
          auth,
          email,
          password
        );

        if (user) {
          Router.push('/conversas');
        }
      } catch (err) {}
    },
    []
  );

  return (
    <AuthContext.Provider
      value={{
        signInWithGoogle,
        signInWithEmailAndPassword,
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
