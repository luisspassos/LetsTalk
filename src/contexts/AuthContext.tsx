import { createContext, ReactNode, useCallback, useContext } from 'react';
import Router from 'next/router';

type AuthProviderProps = {
  children: ReactNode;
};

type SignInData = {
  email: string;
  password: string;
};

type AuthContextData = {
  signInWithEmailAndPassword: ({
    email,
    password,
  }: SignInData) => Promise<void>;
};

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const signInWithEmailAndPassword = useCallback(
    async ({ email, password }: SignInData) => {
      const { signInWithEmailAndPassword: FirebaseSignInWithEmailAndPassword } =
        await import('firebase/auth');

      const { auth } = await import('../services/firebase');

      const { user } = await FirebaseSignInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (user) {
        Router.push('/conversas');
      }
    },
    []
  );

  return (
    <AuthContext.Provider
      value={{
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
