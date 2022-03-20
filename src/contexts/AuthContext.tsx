import { UserCredential } from 'firebase/auth';
import { createContext, ReactNode, useCallback, useContext } from 'react';

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
  }: SignInData) => Promise<UserCredential>;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const signInWithEmailAndPassword = useCallback(
    async ({ email, password }: SignInData) => {
      const { signInWithEmailAndPassword: FirebaseSignInWithEmailAndPassword } =
        await import('firebase/auth');

      const { auth } = await import('../services/firebase');

      const loginResult = await FirebaseSignInWithEmailAndPassword(
        auth,
        email,
        password
      );

      return loginResult;
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
