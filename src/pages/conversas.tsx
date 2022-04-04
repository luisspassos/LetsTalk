import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import nookies from 'nookies';
import { firebaseAdmin } from '../services/firebaseAdmin';

export default function Conversations() {
  return <h1>Conversations</h1>;
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
