import { Flex } from '@chakra-ui/react';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { doc, getDoc } from 'firebase/firestore';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import nookies from 'nookies';
import { useEffect } from 'react';
import { Configurations } from '../components/Configurations';
import { Conversations } from '../components/Conversations';
import { Sidebar } from '../components/Sidebar';
import { useAuth } from '../contexts/AuthContext';
import {
  ConversationsType,
  useConversations,
} from '../contexts/ConversationsContext';
import { useTab } from '../contexts/TabContext';
import { db } from '../services/firebase';
import { auth } from '../services/firebaseAdmin';
import {
  ConversationsIdType,
  formatConversations,
} from '../utils/formatConversations';

type ConversationsPageProps = {
  user: DecodedIdToken;
  conversationsFormatted: ConversationsType;
};

export default function ConversationsPage({
  user,
  conversationsFormatted,
}: ConversationsPageProps) {
  const { tab } = useTab();
  const { fillUser, addUsernameInDb } = useAuth();
  const { changeConversationsState } = useConversations();

  useEffect(() => {
    const username = user?.name;

    fillUser({
      username,
      ...user,
    });

    addUsernameInDb(username, user.uid);

    changeConversationsState(conversationsFormatted);
  }, [
    fillUser,
    user,
    addUsernameInDb,
    changeConversationsState,
    conversationsFormatted,
  ]);

  const CurrentTab = {
    conversations: Conversations,
    configurations: Configurations,
  }[tab];

  return (
    <>
      <Flex h='100vh'>
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

    const userRef = doc(db, 'conversations', user?.name);
    const userSnap = await getDoc(userRef);

    const conversationsId = userSnap.data()
      ?.conversationsId as ConversationsIdType;

    const conversationsFormatted = await formatConversations(conversationsId);

    if (user) {
      return {
        props: {
          conversationsFormatted,
          user,
        },
      };
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }

  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  };
};
