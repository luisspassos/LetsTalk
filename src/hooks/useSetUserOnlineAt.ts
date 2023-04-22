import { useAuth } from 'contexts/AuthContext';
import { OnlineAt } from 'utils/types';

export function useSetUserOnlineAt() {
  const { user } = useAuth();

  async function setUserOnlineAt(onlineAt?: OnlineAt) {
    if (!user?.displayName) return;

    const { db } = await import('services/firebase');
    const { doc, updateDoc } = await import('firebase/firestore');

    const userRef = doc(db, 'users', user.displayName);

    await updateDoc(userRef, {
      onlineAt: onlineAt ?? Date.now(),
    });
  }

  return { setUserOnlineAt };
}
