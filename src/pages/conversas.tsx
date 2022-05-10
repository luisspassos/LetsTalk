import { Flex } from '@chakra-ui/react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import nookies from 'nookies';
import { useEffect } from 'react';
import { Configurations } from '../components/Configurations';
import { Conversations } from '../components/Conversations';
import { Sidebar } from '../components/Sidebar';
import { TokenUser, useAuth } from '../contexts/AuthContext';
import {
  ConversationsType,
  useConversations,
} from '../contexts/ConversationsContext';
import { useTab } from '../contexts/TabContext';
import { auth } from '../services/firebaseAdmin';
import { getConversations } from '../utils/getConversations';

type ConversationsPageProps = {
  user: TokenUser;
  conversations: ConversationsType;
};

export default function ConversationsPage({
  user,
  conversations,
}: ConversationsPageProps) {
  const { tab } = useTab();
  const { fillUser, addUsernameInDb } = useAuth();
  const {
    conversations: { changeConversationsState },
  } = useConversations();

  useEffect(() => {
    fillUser(user);

    addUsernameInDb(user.username, user.uid);

    changeConversationsState(conversations);
  }, [
    fillUser,
    user,
    changeConversationsState,
    conversations,
    addUsernameInDb,
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
  } catch {}

  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  };
};
