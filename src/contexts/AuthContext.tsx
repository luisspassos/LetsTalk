import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword as FirebaseSignInWithEmailAndPassword,
} from 'firebase/auth';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';
import { auth } from '../services/firebase';
import Router from 'next/router';
import { FirebaseError } from 'firebase/app';
import { FirebaseErrorType, SignInErrorObject } from '../types';

type AuthProviderProps = {
  children: ReactNode;
};

type SignInData = {
  email: string;
  password: string;
};

type SignInError = Record<string, SignInErrorObject>;

type AuthContextData = {
  signInWithGoogle: () => Promise<void>;
  signInWithEmailAndPassword: ({
    email,
    password,
  }: SignInData) => Promise<void>;
  firebaseError: FirebaseErrorType;
  handleResetFirebaseEmailValidation: () => void;
  handleResetFirebasePasswordValidation: () => void;
};

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [firebaseError, setFirebaseError] = useState({
    email: null,
    password: null,
  } as FirebaseErrorType);

  const handleResetFirebaseEmailValidation = useCallback(() => {
    setFirebaseError((prevState) => ({
      ...prevState,
      email: null,
    }));
  }, []);

  const handleResetFirebasePasswordValidation = useCallback(() => {
    setFirebaseError((prevState) => ({
      ...prevState,
      password: null,
    }));
  }, []);

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

          const error = errors[err.code];

          setFirebaseError({
            email: error.type === 'email' ? error : null,
            password: error.type === 'password' ? error : null,
          });
        }
      }
    },
    []
  );

  return (
    <AuthContext.Provider
      value={{
        signInWithGoogle,
        signInWithEmailAndPassword,
        firebaseError,
        handleResetFirebasePasswordValidation,
        handleResetFirebaseEmailValidation,
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
