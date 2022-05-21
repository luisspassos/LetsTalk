import { Flex } from '@chakra-ui/react';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
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

type UserInfo = {
  onlineAt: OnlineAt;
  uid: string;
};

export default function ConversationsPage({
  user,
  conversations,
}: ConversationsPageProps) {
  const { tab } = useTab();
  const { fillUser, addUsernameInDb } = useAuth();
  const {
    conversations: { setConversations },
  } = useConversations();

  const [
    disableOnSnapshotOfUserInformation,
    setDisableOnSnapshotOfUserInformation,
  ] = useState(false);

  const setUserOnlineAt = useCallback(
    async (onlineAt: OnlineAt) => {
      const userRef = doc(db, 'users', user.username);

      await updateDoc(userRef, {
        onlineAt,
      });
    },
    [user.username]
  );

  // leaves the user online if they have another tab open with the same account
  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'users', user.username), (doc) => {
      const { onlineAt } = doc.data() as UserInfo;

      if (onlineAt === 'now' || disableOnSnapshotOfUserInformation) return;

      setUserOnlineAt('now');
    });

    return () => {
      unsub();
    };
  }, [user.username, setUserOnlineAt, disableOnSnapshotOfUserInformation]);

  useEffect(() => {
    function beforeUnloadEvent() {
      setUserOnlineAt(Date.now());
      setDisableOnSnapshotOfUserInformation(true);
    }

    (async () => {
      fillUser(user);

      setConversations(conversations);

      await addUsernameInDb(user.username, user.uid);

      window.addEventListener('beforeunload', beforeUnloadEvent);
    })();

    return () => {
      setUserOnlineAt(Date.now());
      window.removeEventListener('beforeunload', beforeUnloadEvent);
    };
  }, [
    fillUser,
    user,
    setConversations,
    conversations,
    addUsernameInDb,
    setUserOnlineAt,
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
