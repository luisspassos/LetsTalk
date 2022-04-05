import { Flex } from '@chakra-ui/react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import nookies from 'nookies';
import { Sidebar } from '../components/Conversations/Sidebar';
import { firebaseAdmin } from '../services/firebaseAdmin';

export default function Conversations() {
  return (
    <Flex h='100vh'>
      <Sidebar />
      <p>Conversations</p>
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
        props: {},
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
