import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { createContext, ReactNode, useCallback, useContext } from 'react';
import { auth } from '../services/firebase';
import Router from 'next/router';

type AuthProviderProps = {
  children: ReactNode;
};

type AuthContextData = {
  signInWithGoogle: () => Promise<void>;
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
      console.error(err);
    }
  }, []);

  const signInWithEmailAndPassword = useCallback(async () => {}, []);

  return (
    <AuthContext.Provider value={{ signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const data = useContext(AuthContext);

  return data;
}
