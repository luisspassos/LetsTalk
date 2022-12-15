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
import { useAuth, UserType } from '../contexts/AuthContext';
import {
  ConversationType,
  useConversations,
} from '../contexts/ConversationsContext';
import nookies from 'nookies';
import { redirectToUserIfNoUser } from 'utils/redirectToHomeIfNoUser';

type ConversationsPageProps = {
  user: UserType;
  conversations: ConversationType[];
};

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

export default function ConversationsPage({
  user,
  conversations,
}: ConversationsPageProps) {
  const { fillUser, addUsernameInDb, user: contextUser } = useAuth();
  const {
    conversations: { setConversations },
  } = useConversations();
  const { takeUserOffline, takeUserOnline, setUserOnlineAt, clearAllEvents } =
    useOnlineAtEvents();
  const router = useRouter();
  const { onClose: closeDeleteAccModal } = useDeleteAccountModal();
  const { renamingName } = useRenamingName();

  const [ignoreAddingUserInDb, setIgnoreAddingUserInDb] = useState(false);

  useEffect(() => {
    fillUser(user);
  }, [conversations, fillUser, setConversations, user]);

  useEffect(() => {
    function checkIfUserAccHasBeenDeleted() {
      if (!contextUser) return;

      let ignoreInitialOnSnapshot = true;

      if (!contextUser.displayName) return;

      const unsub = onSnapshot(
        doc(db, 'users', contextUser.displayName),
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
    contextUser,
    router,
    clearAllEvents,
    fillUser,
    closeDeleteAccModal,
    renamingName,
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
  }, [addUsernameInDb, ignoreAddingUserInDb, setUserOnlineAt, user]);

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
    <Wrapper>
      <Conversations />
    </Wrapper>
  );
}

export const getServerSideProps: GetServerSideProps = redirectToUserIfNoUser;
