import { createContext, ReactNode, useCallback, useContext } from 'react';

type AuthProviderProps = {
  children: ReactNode;
};

type AuthContextData = {
  signInWithGoogle: () => Promise<void>;
};

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const signInWithGoogle = useCallback(async () => {}, []);

  return <AuthContext.Provider value={{ signInWithGoogle }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const data = useContext(AuthContext);

  return data;
}
