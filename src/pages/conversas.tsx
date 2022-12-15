import { Conversations } from 'components/ConversationsPage';
import { Wrapper } from 'components/Sidebar/Wrapper';
import { useDeleteAccountModal } from 'contexts/Modal/DeleteAccountModalContext';
import { useOnlineAtEvents } from 'contexts/OnlineAtEventsContext';
import { useRenamingName } from 'contexts/RenamingNameContext';
import { onSnapshot, doc } from 'firebase/firestore';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { db } from 'services/firebase';
import { useAuth } from '../contexts/AuthContext';
import nookies from 'nookies';
import { redirectToUserIfNoUser } from 'utils/redirectToHomeIfNoUser';
import { Loading } from 'components/ConversationsPage/Loading';

function createLocationchangeEvent() {
  let oldPushState = history.pushState;
  history.pushState = function pushState() {
    const args: any = arguments;
    let ret = oldPushState.apply(this, args);
    window.dispatchEvent(new Event('pushstate'));
    window.dispatchEvent(new Event('locationchange'));
    return ret;
  };

  let oldReplaceState = history.replaceState;
  history.replaceState = function replaceState() {
    const args: any = arguments;
    let ret = oldReplaceState.apply(this, args);
    window.dispatchEvent(new Event('replacestate'));
    window.dispatchEvent(new Event('locationchange'));
    return ret;
  };

  window.addEventListener('popstate', () => {
    window.dispatchEvent(new Event('locationchange'));
  });
}

export default function ConversationsPage() {
  const { fillUser, addUsernameInDb, user } = useAuth();
  const { takeUserOffline, takeUserOnline, setUserOnlineAt, clearAllEvents } =
    useOnlineAtEvents();
  const router = useRouter();
  const { onClose: closeDeleteAccModal } = useDeleteAccountModal();
  const { renamingName } = useRenamingName();

  const [ignoreAddingUserInDb, setIgnoreAddingUserInDb] = useState(false);

  useEffect(() => {
    function checkIfUserAccHasBeenDeleted() {
      if (!user) return;

      let ignoreInitialOnSnapshot = true;

      if (!user.displayName) return;

      const unsub = onSnapshot(
        doc(db, 'users', user.displayName),
        async (doc) => {
          if (ignoreInitialOnSnapshot) {
            ignoreInitialOnSnapshot = false;
            return;
          }
          if (!doc.exists() && !renamingName) {
            nookies.destroy({}, 'token');
            clearAllEvents();
            await router.push('/');
            fillUser(null);
            closeDeleteAccModal();
            router.push('/conversations');
          }
        }
      );

      return unsub;
    }

    const unsub = checkIfUserAccHasBeenDeleted();

    return () => {
      unsub && unsub();
    };
  }, [
    router,
    clearAllEvents,
    fillUser,
    closeDeleteAccModal,
    renamingName,
    user,
  ]);

  useEffect(() => {
    (async () => {
      // it will only add the user in the db when starting the application

      if (!ignoreAddingUserInDb && user?.displayName) {
        await addUsernameInDb(user.displayName, user.uid);
        setIgnoreAddingUserInDb(true);
      }

      setUserOnlineAt('now');
    })();
  }, [
    addUsernameInDb,
    ignoreAddingUserInDb,
    setUserOnlineAt,
    user?.displayName,
    user?.uid,
  ]);

  useEffect(() => {
    createLocationchangeEvent();

    for (let event of takeUserOffline.events) {
      window.addEventListener(event, takeUserOffline.func);
    }

    for (let event of takeUserOnline.events) {
      window.addEventListener(event, takeUserOnline.func);
    }

    return () => {
      clearAllEvents();
    };
  }, [takeUserOnline, takeUserOffline, clearAllEvents]);

  return (
    <>
      <Wrapper>
        <Conversations />
      </Wrapper>
      <Loading />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = redirectToUserIfNoUser;
