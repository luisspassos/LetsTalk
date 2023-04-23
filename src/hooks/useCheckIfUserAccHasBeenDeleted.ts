import { useAuth } from 'contexts/AuthContext';
import { useRenamingName } from 'contexts/RenamingNameContext';
import { onSnapshot, doc } from 'firebase/firestore';
import router from 'next/router';
import { MutableRefObject, useEffect } from 'react';
import { db } from 'services/firebase';
import { iterateWindowEvents } from 'utils/iterateEvents';
import nookies from 'nookies';
import { Event as EventType } from 'utils/iterateEvents';

export function useCheckIfUserHasBeenDeleted(
  onlineAtEvents: MutableRefObject<EventType[]>
) {
  const { fillUser, user } = useAuth();
  const { renamingName } = useRenamingName();

  useEffect(() => {
    function checkIfUserAccHasBeenDeleted() {
      let ignoreInitialOnSnapshot = true;

      if (user?.displayName === null || user === null) return;

      const unsub = onSnapshot(
        doc(db, 'users', user.displayName),
        async (doc) => {
          if (ignoreInitialOnSnapshot) {
            ignoreInitialOnSnapshot = false;
            return;
          }
          if (!doc.exists() && !renamingName) {
            nookies.destroy({}, 'token');
            iterateWindowEvents('remove', onlineAtEvents.current);
            await router.push('/');
            fillUser(null);
          }
        }
      );

      return unsub;
    }

    const unsub = checkIfUserAccHasBeenDeleted();

    return () => {
      unsub && unsub();
    };
  }, [fillUser, onlineAtEvents, renamingName, user]);
}
