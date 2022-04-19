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
import { useTab } from '../contexts/TabContext';
import { auth, db } from '../services/firebase';
import { firebaseAdmin } from '../services/firebaseAdmin';

type ContactsIdType = string[] | undefined;

type ConversationsPageProps = {
  user: DecodedIdToken;
};

export default function ConversationsPage({ user }: ConversationsPageProps) {
  const { tab } = useTab();
  const { fillUser, addUsernameInDb } = useAuth();

  useEffect(() => {
    const username = user?.name;

    fillUser({
      username,
      ...user,
    });

    addUsernameInDb(username, user.uid);
  }, [fillUser, user, addUsernameInDb]);

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
    const auth = firebaseAdmin.auth();

    const cookies = nookies.get(ctx);
    const user = await auth.verifyIdToken(cookies.token);

    const userRef = doc(db, 'conversations', user?.name);
    const userSnap = await getDoc(userRef);

    const contactsId = userSnap.data()?.contacts as ContactsIdType;

    const contacts = contactsId?.map((id) => );

    if (user) {
      return {
        props: {
          contactsId,
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
