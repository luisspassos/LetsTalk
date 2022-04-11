import { Flex } from '@chakra-ui/react';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import nookies from 'nookies';
import { useEffect } from 'react';
import { Configurations } from '../components/Configurations';
import { Conversations } from '../components/Conversations';
import { Sidebar } from '../components/Sidebar';
import { useAuth } from '../contexts/AuthContext';
import { useTab } from '../contexts/TabContext';
import { firebaseAdmin } from '../services/firebaseAdmin';

type ConversationsPageProps = {
  user: DecodedIdToken;
};

export default function ConversationsPage({ user }: ConversationsPageProps) {
  const { tab } = useTab();
  const { fillUser } = useAuth();

  useEffect(() => {
    fillUser(user);
  }, [fillUser, user]);

  const CurrentTab = {
    conversations: Conversations,
    configurations: Configurations,
  }[tab];

  return (
    <Flex
      sx={{
        '::-webkit-scrollbar': {
          width: '12px',
          backgroundColor: `transparent`,
        },
        '::-webkit-scrollbar-thumb': {
          boxShadow: 'inset 0 0 10px 10px var(--chakra-colors-blueAlpha-700)',
          border: 'solid 3px transparent',
          transition: '0.2s',
        },
        '::-webkit-scrollbar-thumb:hover': {
          boxShadow: 'inset 0 0 10px 10px var(--chakra-colors-blueAlpha-900)',
        },
      }}
      h='100vh'
    >
      <Sidebar />
      <CurrentTab />
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  try {
    const cookies = nookies.get(ctx);
    const user = await firebaseAdmin.auth().verifyIdToken(cookies.token);

    if (user) {
      return {
        props: {
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
