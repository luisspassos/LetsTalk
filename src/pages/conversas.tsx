import { Flex } from '@chakra-ui/react';
import { getAdditionalUserInfo } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
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
import { db } from '../services/firebase';
import { auth } from '../services/firebaseAdmin';
import {
  getConversations,
  UserConversationsDataType,
} from '../utils/getConversations';
import { auth as authFront } from '../services/firebase';

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
  const { changeConversationsState } = useConversations();
  // ver esse ngc de usuario novo
  // ver sort no arary de conversas
  // colocar last messages
  useEffect(() => {
    fillUser(user);
    if (authFront.currentUser) {
      console.log(getAdditionalUserInfo());
    }
    addUsernameInDb(user.username, user.uid);

    changeConversationsState(conversations);
  }, [
    fillUser,
    user,
    addUsernameInDb,
    changeConversationsState,
    conversations,
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

    const userConversationsRef = doc(db, 'conversations', user?.name);
    const userConversationsSnap = await getDoc(userConversationsRef);

    const userConversationsSnapData =
      userConversationsSnap.data() as UserConversationsDataType;

    const conversations = await getConversations(userConversationsSnapData);

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
