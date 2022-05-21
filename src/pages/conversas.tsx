import { Flex } from '@chakra-ui/react';
import { doc, updateDoc } from 'firebase/firestore';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import nookies from 'nookies';
import { useCallback, useEffect } from 'react';
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
import { auth } from '../services/firebaseAdmin';
import { getConversations } from '../utils/getConversations';

type ConversationsPageProps = {
  user: UserType;
  conversations: ConversationsType;
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

  const setUserOnlineAt = useCallback(
    async (onlineAt: number | 'now') => {
      const userRef = doc(db, 'users', user.username);

      await updateDoc(userRef, {
        onlineAt,
      });
    },
    [user.username]
  );

  useEffect(() => {
    function unloadEvent() {
      setUserOnlineAt(Date.now());
    }

    window.addEventListener('unload', unloadEvent);

    (async () => {
      fillUser(user);

      setConversations(conversations);

      await addUsernameInDb(user.username, user.uid);

      setUserOnlineAt('now');
    })();

    return () => {
      setUserOnlineAt(Date.now());
      // terminar de testar
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
    const user = await auth.verifyIdToken(cookies.token);

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
