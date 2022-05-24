import { Flex } from '@chakra-ui/react';
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import nookies from 'nookies';
import { useCallback, useEffect, useState } from 'react';
import { Configurations } from '../components/Configurations';
import { Conversations } from '../components/Conversations';
import { Sidebar } from '../components/Sidebar';
import { UserType, useAuth } from '../contexts/AuthContext';
import {
  ConversationsType,
  useConversations,
} from '../contexts/ConversationsContext';
import { useTab } from '../contexts/TabContext';
import { db } from '../services/firebase';
import { auth as adminAuth } from '../services/firebaseAdmin';
import { getConversations } from '../utils/getConversations';
import { OnlineAt } from '../types';

type ConversationsPageProps = {
  user: UserType;
  conversations: ConversationsType;
};

export default function ConversationsPage({
  user,
  conversations,
}: ConversationsPageProps) {
  const { tab } = useTab();
  const { fillUser, addUsernameInDb, user: contextUser } = useAuth();
  const {
    conversations: { setConversations },
  } = useConversations();

  const [ignore, setIgnore] = useState(false);

  const [
    disableOnSnapshotOfUserInformation,
    setDisableOnSnapshotOfUserInformation,
  ] = useState(false);

  const setUserOnlineAt = useCallback(
    async (onlineAt: OnlineAt, username: string) => {
      if (!contextUser.username) return;

      const userRef = doc(db, 'users', username);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) return;

      await updateDoc(userRef, {
        onlineAt,
      });
    },
    [contextUser.username]
  );

  // leaves the user online if they have another tab open with the same account
  useEffect(() => {
    if (!contextUser.username) return;

    const unsub = onSnapshot(doc(db, 'users', contextUser.username), (doc) => {
      const onlineAt = doc.data()?.onlineAt as OnlineAt;
      // verificar tipagem disso aq

      if (!doc.data()) return;

      const username = doc.id;

      if (onlineAt === 'now' || disableOnSnapshotOfUserInformation) return;

      setUserOnlineAt('now', username);
    });

    return () => {
      unsub();
    };
  }, [
    contextUser.username,
    setUserOnlineAt,
    disableOnSnapshotOfUserInformation,
  ]);

  useEffect(() => {
    function beforeUnloadEvent() {
      setUserOnlineAt(Date.now(), contextUser.username);
      setDisableOnSnapshotOfUserInformation(true);
    }

    (async () => {
      if (!ignore) {
        fillUser(user);

        setConversations(conversations);

        await addUsernameInDb(user.username, user.uid);

        setIgnore(true);
      }

      window.addEventListener('beforeunload', beforeUnloadEvent);
    })();

    return () => {
      setUserOnlineAt(Date.now(), contextUser.username);
      window.removeEventListener('beforeunload', beforeUnloadEvent);
    };
  }, [
    fillUser,
    user,
    setConversations,
    conversations,
    addUsernameInDb,
    setUserOnlineAt,
    ignore,
    contextUser.username,
  ]);

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
