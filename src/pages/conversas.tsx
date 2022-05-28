import { Flex } from '@chakra-ui/react';
import { doc, onSnapshot } from 'firebase/firestore';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import { useEffect, useState } from 'react';
import { Configurations } from '../components/Configurations';
import { Conversations } from '../components/Conversations';
import { Sidebar } from '../components/Sidebar';
import { UserType, useAuth } from '../contexts/AuthContext';
import {
  ConversationsType,
  useConversations,
} from '../contexts/ConversationsContext';
import { useOnlineAtEvents } from '../contexts/onlineAtEventsContext';
import { useTab } from '../contexts/TabContext';
import { db } from '../services/firebase';
import { auth as adminAuth } from '../services/firebaseAdmin';
import { getConversations } from '../utils/getConversations';

type ConversationsPageProps = {
  user: UserType;
  conversations: ConversationsType;
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
  const { tab } = useTab();
  const { fillUser, addUsernameInDb, user: contextUser } = useAuth();
  const {
    conversations: { setConversations },
  } = useConversations();
  const { takeUserOffline, takeUserOnline, setUserOnlineAt, clearAllEvents } =
    useOnlineAtEvents();

  const router = useRouter();

  const [ignoreAddingUserInDb, setIgnoreAddingUserInDb] = useState(false);

  useEffect(() => {
    fillUser(user);
    setConversations(conversations);
  }, [conversations, fillUser, setConversations, user]);

  useEffect(() => {
    function checkIfUserAccHasBeenDeleted() {
      if (!contextUser) return;

      const unsub = onSnapshot(
        doc(db, 'users', contextUser?.username),
        (doc) => {
          if (!doc.exists()) {
            clearAllEvents();
            router.push('/');
          }
        }
      );

      return unsub;
    }

    const unsub = checkIfUserAccHasBeenDeleted();

    return () => {
      unsub && unsub();
    };
  }, [contextUser, router, clearAllEvents]);

  useEffect(() => {
    (async () => {
      // it will only add the user in the db when starting the application

      if (!ignoreAddingUserInDb && user) {
        await addUsernameInDb(user.username, user.uid);
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

  const CurrentTab = {
    conversations: Conversations,
    configurations: Configurations,
  }[tab];

  return (
    <>
      <Flex minH='100vh'>
        <Sidebar />
        <CurrentTab />
      </Flex>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  try {
    const cookies = nookies.get(ctx);
    const user = await adminAuth.verifyIdToken(cookies.token);

    const conversations = await getConversations(user.uid);

    if (user) {
      const newUser = {
        ...user,
        username: user.name,
      };

      return {
        props: {
          conversations,
          user: newUser,
        },
      };
    }
  } catch (err) {
    console.log(err);
  }

  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  };
};
