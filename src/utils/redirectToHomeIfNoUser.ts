import { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';
import { auth as adminAuth } from 'services/firebaseAdmin';

export async function redirectToHomeIfNoUser(ctx: GetServerSidePropsContext) {
  try {
    const cookies = nookies.get(ctx);
    const user = await adminAuth.verifyIdToken(cookies.token);

    if (user) {
      return {
        props: {},
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
}
