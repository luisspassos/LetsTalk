import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword as FirebaseSignInWithEmailAndPassword } from 'firebase/auth';
import { createContext, ReactNode, useCallback, useContext, useState } from 'react';
import { auth } from '../services/firebase';
import Router from 'next/router';
import { FirebaseError } from 'firebase/app';

type AuthProviderProps = {
  children: ReactNode;
};

type SignInData = {
  email: string;
  password: string;
};

type SignInErrorObject = {
  type: string;
  message: string;
};

type SignInError = Record<string, SignInErrorObject>;

type AuthContextData = {
  signInWithGoogle: () => Promise<void>;
  signInWithEmailAndPassword: ({ email, password }: SignInData) => Promise<void>;
};

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [firebaseError, setFirebaseError] = useState({} as SignInErrorObject);

  const signInWithGoogle = useCallback(async () => {
    try {
      const googleProvider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, googleProvider);

      if (user) {
        Router.push('/conversas');
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const signInWithEmailAndPassword = useCallback(async ({ email, password }: SignInData) => {
    try {
      const { user } = await FirebaseSignInWithEmailAndPassword(auth, email, password);

      if (user) {
        Router.push('/conversas');
      }
    } catch (err) {
      if (err instanceof FirebaseError) {
        const errors: SignInError = {
          'auth/user-not-found': {
            type: 'email',
            message: 'Este usuário não existe',
          },
          'auth/wrong-password': {
            type: 'password',
            message: 'Senha incorreta',
          },
        };

        setFirebaseError(errors[err.code]);
      }
    }
  }, []);

  return <AuthContext.Provider value={{ signInWithGoogle, signInWithEmailAndPassword }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const data = useContext(AuthContext);

  return data;
}
