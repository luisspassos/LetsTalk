import { useAuth } from 'contexts/AuthContext';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { auth } from 'services/firebase';

export function useOnAuthStateChanged() {
  const { initializeUser, fillUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    function callback(user: User | null) {
      if (user === null) {
        fillUser(null);
        router.push('/');

        return;
      }

      initializeUser({ user });
    }

    const unsub = onAuthStateChanged(auth, callback);

    return () => {
      unsub();
    };
  }, [fillUser, initializeUser, router, router.pathname]);
}
