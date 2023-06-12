import { User } from 'firebase/auth';
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
import { useSetUserOnlineAt } from 'hooks/useSetUserOnlineAt';

type SignInData = {
  email: string;
  password: string;
};

type SendEmailToRecoverPasswordData = {
  email: string;
};

type InitializeUser = (params: { username?: string; user: User }) => void;

export type UserType =
  | ({
      photoURL: string | undefined;
      nameAndId: ReturnType<GetNameAndId>;
    } & Omit<User, 'photoURL'>)
  | null;

type SetUsernameParams = {
  user: User;
  name: string;
};

type GetNameAndId = (username: string | null | undefined) => {
  name: string;
  id: string | undefined;
};

export type AuthProviderProps = {
  children: ReactNode;
};

type AuthContextData = {
  signOut: () => Promise<void>;
  user: UserType;
  fillUser: (newUser: UserType) => void;
  isLoggedInWithGoogle: boolean;
  initializeUser: InitializeUser;
};

export const AuthContext = createContext({} as AuthContextData);

export const getNameAndId: GetNameAndId = (username) => {
  if (!username) throw 'Username does not exist';

  const [name, id] = username.split('#');

  return { name, id };
};

export const getCurrentUserId = async () => {
  const { db } = await import('../services/firebase');

  const {
    doc,
    getDoc,
    increment: incrementId,
    updateDoc,
    setDoc,
  } = await import('firebase/firestore');
  const currentUserIdRef = doc(db, 'users', 'current_user_id');
  const currentUserIdSnap = async () => await getDoc(currentUserIdRef);

  if ((await currentUserIdSnap()).exists()) {
    await updateDoc(currentUserIdRef, {
      id: incrementId(1),
    });
  } else {
    await setDoc(currentUserIdRef, {
      id: 1,
    });
  }

  const id: number = (await currentUserIdSnap()).data()?.id;

  return id;
};

export const addUserInDb = async (username: string, uid: string) => {
  const { getUserRef } = await import('utils/getUserRef');

  const { userRef } = await getUserRef(username);

  const { setDoc } = await import('firebase/firestore');

  await setDoc(userRef, {
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

  return { username };
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
  const { setUserOnlineAt } = useSetUserOnlineAt();

  const fillUser = useCallback((newUser: UserType) => {
    setUser(newUser);
  }, []);

  const initializeUser: InitializeUser = useCallback(
    ({ user, username = user.displayName }) => {
      const falsyValueAcceptableInAvatar = undefined;

      const formattedUser: UserType = {
        ...user,
        displayName: username,
        photoURL: user.photoURL ?? falsyValueAcceptableInAvatar,
        nameAndId: getNameAndId(username),
      };

      fillUser(formattedUser);
    },
    [fillUser]
  );

  const isLoggedInWithGoogle =
    user?.providerData[0].providerId === 'google.com';

  const signOut = async () => {
    const { auth } = await import('../services/firebase');
    const { signOut } = await import('firebase/auth');

    setUserOnlineAt();

    await signOut(auth);
  };

  useEffect(() => {
    function tokenListener() {
      return auth.onIdTokenChanged(async (user) => {
        if (!user) {
          nookies.set(undefined, 'token', '', { path: '/' });
        } else {
          const token = await user.getIdToken();
          nookies.set(undefined, 'token', token, {
            path: '/',
            maxAge: 60 * 60 /* 1 hour */,
          });
        }
      });
    }

    return tokenListener();
  }, []);

  useEffect(() => {
    const refreshToken = async () => {
      const user = auth.currentUser;
      if (user) await user.getIdToken(true);
    };

    function tokenRefreshEvery1Hour() {
      const handle = setInterval(async () => {
        await refreshToken();
      }, 60 * 60 * 1000 /* 1 hour */);

      return () => clearInterval(handle);
    }

    return tokenRefreshEvery1Hour();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        fillUser,
        signOut,
        user,
        isLoggedInWithGoogle,
        initializeUser,
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
